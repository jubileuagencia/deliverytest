import { supabase } from '../lib/supabase';

export const getFavorites = async (userId) => {
    const { data, error } = await supabase
        .from('favorites')
        .select(`
            id,
            product_id,
            products:product_id (
                id,
                name,
                price,
                image_url,
                description
            )
        `)
        .eq('user_id', userId);

    if (error) throw error;

    // Transform data flat
    return data
        .filter(fav => fav.products !== null)
        .map(fav => ({
            id: fav.product_id,
            ...fav.products
        }));
};

export const addFavorite = async (userId, productId) => {
    const { error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, product_id: productId }]);
    if (error) throw error;
    return true;
};

export const removeFavorite = async (userId, productId) => {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
    if (error) throw error;
    return true;
};
