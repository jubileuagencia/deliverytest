import { supabase } from '../lib/supabase';

export const getProducts = async (limit = null) => {
    let query = supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        // Return empty array or throw based on preference. 
        // For now returning empty array to avoid app crash.
        return [];
    }

    return data;
};


export const getCategories = async () => {
    const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon, color')
        .order('name');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
    return data;
};

export const getProductsByCategory = async (categoryName, page = 0, limit = 12) => {
    const start = page * limit;
    const end = start + limit - 1;

    // Join with categories table and filter by category name
    const { data, error } = await supabase
        .from('products')
        .select('*, categories!inner(name)')
        .ilike('categories.name', categoryName)
        .range(start, end);

    if (error) {
        console.error(`Error fetching products for category ${categoryName}:`, error);
        return [];
    }
    return data;
};

export const getProductById = async (id) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
    return data;
};

export const searchProducts = async (query) => {
    if (!query) return [];

    const { data, error } = await supabase
        .rpc('search_products_v2', { query_term: query });

    if (error) {
        console.error('Error searching products:', error);
        return [];
    }
    return data;
};
