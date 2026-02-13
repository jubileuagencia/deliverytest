import React, { useEffect, useState } from 'react';
import { getAdminProducts } from '../../services/products';
import AdminProductTable from './AdminProductTable';
import styles from './AdminProducts.module.css';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        loadProducts();
    }, [refreshTrigger]);

    const loadProducts = async () => {
        setLoading(true);
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
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Gerenciar Produtos</h1>
                    <p className={styles.subtitle}>Visualize e gerencie o catálogo da loja.</p>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>Carregando produtos...</div>
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
