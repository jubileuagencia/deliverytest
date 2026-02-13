import React, { useState } from 'react';
import styles from './AdminProductTable.module.css';

const AdminProductTable = ({ products, onEdit, onDelete, onToggleStatus }) => {
    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (id) => {
        setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
    };

    if (!products || products.length === 0) {
        return <div className={styles.emptyState}>Nenhum produto encontrado.</div>;
    }

    return (
        <div className={styles.container}>
            {/* Desktop Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Produto</th>
                        <th className={styles.th}>Categoria</th>
                        <th className={styles.th}>Preço</th>
                        <th className={styles.th}>Status</th>
                        <th className={`${styles.th} ${styles.textRight}`}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className={styles.row}>
                            <td className={styles.td}>
                                <span className={styles.mobileId}>#{product.display_id}</span>
                            </td>

                            <td className={styles.td}>
                                <div className={styles.productInfo}>
                                    <img src={product.image_url} alt="" className={styles.productImage} />
                                    <span className={styles.mobileName}>{product.name}</span>
                                </div>
                            </td>

                            <td className={styles.td}>
                                {product.categories?.name}
                            </td>

                            <td className={styles.td}>
                                R$ {Number(product.price).toFixed(2)}
                            </td>

                            <td className={styles.td}>
                                <span className={`${styles.statusBadge} ${product.is_active ? styles.active : styles.inactive}`}>
                                    {product.is_active ? 'Ativo' : 'Inativo'}
                                </span>
                            </td>

                            <td className={`${styles.td} ${styles.textRight}`}>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn} onClick={() => onEdit(product)}>✏️</button>
                                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => onDelete(product)}>🗑️</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile View */}
            <div className={styles.mobileListContainer}>
                {products.map(product => {
                    const isExpanded = expandedRows[product.id];
                    return (
                        <div key={product.id} className={styles.mobileCard}>
                            <div className={styles.mobileHeader}>
                                <div className={styles.mobileIdName}>
                                    <span className={styles.mobileId}>#{product.display_id}</span>
                                    <span className={styles.mobileName}>{product.name}</span>
                                </div>
                                <button className={styles.expandBtn} onClick={() => toggleRow(product.id)}>
                                    {isExpanded ? 'Fechar' : 'Detalhes'}
                                </button>
                            </div>

                            {isExpanded && (
                                <div className={styles.mobileDetails}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Categoria:</span>
                                        <span className={styles.detailValue}>{product.categories?.name}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Preço:</span>
                                        <span className={styles.detailValue}>R$ {Number(product.price).toFixed(2)}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Status:</span>
                                        <span className={`${styles.statusBadge} ${product.is_active ? styles.active : styles.inactive}`}>
                                            {product.is_active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                    <div className={styles.mobileActions}>
                                        <button className={styles.actionBtn} onClick={() => onEdit(product)}>Editar</button>
                                        <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => onDelete(product)}>Excluir</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminProductTable;
