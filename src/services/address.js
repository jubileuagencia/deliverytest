import { supabase } from '../lib/supabase';

export const getUserAddresses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_main', { ascending: false }); // Main first

    if (error) {
        console.error('Error fetching addresses:', error);
        return [];
    }
    return data;
};

export const createAddress = async (addressData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // If setting as main, unmark others first (handle in frontend or complex query, 
    // for now we trust the logic or let DB handle constraints if added)
    // Ideally use RPC for atomic switch, but standard insert for now.

    if (addressData.is_main) {
        await supabase
            .from('user_addresses')
            .update({ is_main: false })
            .eq('user_id', user.id);
    }

    const { data, error } = await supabase
        .from('user_addresses')
        .insert([{ ...addressData, user_id: user.id }])
        .select()
        .single();

    if (error) throw error;
    return data;
};
