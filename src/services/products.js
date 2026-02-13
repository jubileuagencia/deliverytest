import { supabase } from '../lib/supabase';

export const getProducts = async (limit = null) => {
    try {
        let query = supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('id', { ascending: true });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getAdminProducts = async (page = 0, limit = 50) => {
    try {
        const start = page * limit;
        const end = start + limit - 1;

        const { data, error, count } = await supabase
            .from('products')
            .select('*, categories(name)', { count: 'exact' })
            .order('display_id', { ascending: true })
            .range(start, end);

        if (error) throw error;
        return { data, count };
    } catch (error) {
        console.error('Error fetching admin products:', error);
        throw error;
    }
};


export const getCategories = async () => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('id, name, icon, color')
            .order('name');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryName, page = 0, limit = 12) => {
    try {
        const start = page * limit;
        const end = start + limit - 1;

        const { data, error } = await supabase
            .from('products')
            .select('*, categories!inner(name)')
            .ilike('categories.name', categoryName)
            .range(start, end);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error(`Error fetching products for category ${categoryName}:`, error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(name)')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export const searchProducts = async (query) => {
    if (!query) return [];

    try {
        const { data, error } = await supabase
            .rpc('search_products_v2', { query_term: query });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};
