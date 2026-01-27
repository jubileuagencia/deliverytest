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

export const getProductsByCategory = async (categoryName) => {
    // Join with categories table and filter by category name
    const { data, error } = await supabase
        .from('products')
        .select('*, categories!inner(name)')
        .ilike('categories.name', categoryName);

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
