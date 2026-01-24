import { supabase } from '../lib/supabase';

export const getProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        // Return empty array or throw based on preference. 
        // For now returning empty array to avoid app crash.
        return [];
    }

    return data;
};
