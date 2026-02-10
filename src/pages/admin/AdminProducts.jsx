import React, { useEffect, useState } from 'react';
import { getAdminProducts } from '../../services/products';
import AdminProductTable from './AdminProductTable';
import styles from './AdminProductTable.module.css'; // Reusing container styles if needed, or create page styles

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        loadProducts();
    }, [refreshTrigger]);

    const loadProducts = async () => {
        setLoading(true);
        // Default to page 0, limit 100 for now to see list
        const { data, count } = await getAdminProducts(0, 100);
        setProducts(data || []);
        setLoading(false);
    };

    const handleEdit = (product) => {
        alert(`Editar produto: ${product.name} (ID: ${product.display_id}) \n\n(Funcionalidade em desenvolvimento)`);
    };

    const handleDelete = (product) => {
        if (window.confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
            alert('Exclusão simulada. Implementação real na próxima etapa.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Gerenciar Produtos</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Visualize e gerencie o catálogo da loja.</p>
                </div>
                {/* 
                <button 
                    style={{
                        backgroundColor: 'var(--primary-color)',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                    onClick={() => alert('Novo Produto')}
                >
                    + Novo Produto
                </button>
                */}
            </div>

            {loading ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>Carregando produtos...</div>
            ) : (
                <AdminProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default AdminProducts;
