import { supabase } from '../lib/supabase';

// Helper to snapshot price (used in creation) extends basic order creation
export const createOrder = async ({ address_id, payment_method, cartItems, subtotal, discount, total }) => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    if (!userId) throw new Error("User not authenticated");

    // 1. Create Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: userId,
            address_id,
            payment_method,
            status: 'approved', // Auto-approve for v0.08
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

// [NEW] Get User Orders List
export const getUserOrders = async () => {
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
};

// [NEW] Get Single Order Details
export const getOrderDetails = async (orderId) => {
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
};
