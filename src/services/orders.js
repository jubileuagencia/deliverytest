import { supabase } from '../lib/supabase';

/**
 * Creates an order using server-side price validation via RPC.
 * Falls back to client-side logic if the RPC is not yet deployed.
 */
export const createOrder = async ({ address_id, payment_method, cartItems, subtotal, discount, total }) => {
    try {
        const user = await supabase.auth.getUser();
        const userId = user.data.user?.id;

        if (!userId) throw new Error("User not authenticated");

        // Try server-side validated order creation first
        const rpcResult = await createOrderValidated(address_id, payment_method, cartItems);
        if (rpcResult) return rpcResult;

        // Fallback: client-side order creation (pre-RPC)
        return await createOrderFallback({ userId, address_id, payment_method, cartItems, subtotal, discount, total });
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

/**
 * Server-side validated order creation via Postgres RPC.
 * Returns null if the RPC is not yet deployed.
 */
const createOrderValidated = async (address_id, payment_method, cartItems) => {
    try {
        const items = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        const { data, error } = await supabase.rpc('create_order_validated', {
            p_address_id: address_id,
            p_payment_method: payment_method,
            p_items: items
        });

        if (error) {
            // If RPC doesn't exist, return null to trigger fallback
            if (error.message?.includes('function') || error.code === '42883') {
                console.warn('create_order_validated RPC not found, using fallback');
                return null;
            }
            throw error;
        }

        // RPC returns the order ID, fetch the full order
        const { data: order, error: fetchError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', data)
            .single();

        if (fetchError) throw fetchError;
        return order;
    } catch (error) {
        // If it's a "function not found" error, return null for fallback
        if (error.code === '42883') return null;
        throw error;
    }
};

/**
 * Fallback: client-side order creation (pre-RPC).
 * WARNING: Prices come from the client and are NOT validated server-side.
 * Will be removed once the RPC is deployed.
 */
const createOrderFallback = async ({ userId, address_id, payment_method, cartItems, subtotal, discount, total }) => {
    // 1. Create Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: userId,
            address_id,
            payment_method,
            status: 'approved',
            subtotal,
            discount,
            total
        })
        .select()
        .single();

    if (orderError) throw orderError;

    // 2. Create Order Items (Snapshotting prices)
    const itemsData = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsData);

    if (itemsError) throw itemsError;

    return order;
};

// Get User Orders List
export const getUserOrders = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not found");

        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                items:order_items (
                    quantity,
                    product:products (
                        name,
                        image_url
                    )
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

// Get Single Order Details
export const getOrderDetails = async (orderId) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                address:user_addresses (*),
                items:order_items (
                    *,
                    product:products (*)
                )
            `)
            .eq('id', orderId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};
