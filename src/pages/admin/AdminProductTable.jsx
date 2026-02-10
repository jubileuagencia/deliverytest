import React, { useState } from 'react';
import styles from './AdminProductTable.module.css';

const AdminProductTable = ({ products, onEdit, onDelete, onToggleStatus }) => {
    // State to track expanded rows in mobile view
    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (!products || products.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                Nenhum produto encontrado.
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Produto</th>
                        <th className={styles.th}>Categoria</th>
                        <th className={styles.th}>Preço</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th} style={{ textAlign: 'right' }}>Ações</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {products.map((product) => (
                        <tr key={product.id} className={styles.row}>

                            {/* Desktop Cells (hidden on mobile via CSS) */}
                            <td className={`${styles.td} desktop-only`} style={{ display: 'none' }}>
                                #{product.display_id || '-'}
                            </td>

                            {/* Mobile Structure & Desktop Content Mixed */}
                            {/* 
                                Strategy: Since we are using CSS Media Queries to completely change layout,
                                we render the content structure. 
                                For Desktop: standard IDs are used.
                                For Mobile: We treat the TR as a flex container.
                             */}

                            {/* --- Desktop View Implementation (Standard TD) --- */}
                            <td className={styles.td} width="80px">
                                <span className={styles.mobileId}>#{product.display_id}</span>
                            </td>

                            <td className={styles.td}>
                                <div className={styles.productInfo}>
                                    <img
                                        src={product.image_url || 'https://via.placeholder.com/40'}
                                        alt={product.name}
                                        className={styles.productImage}
                                    />
                                    <span className={styles.mobileName}>{product.name}</span>
                                </div>
                            </td>

                            <td className={styles.td}>
                                <span className="mobile-hidden-label">{product.categories?.name || 'Sem categoria'}</span>
                            </td>

                            <td className={styles.td}>
                                R$ {Number(product.price).toFixed(2)} / {product.unit}
                            </td>

                            <td className={styles.td}>
                                <span className={`${styles.statusBadge} ${product.is_active ? styles.active : styles.inactive}`}>
                                    {product.is_active ? 'Ativo' : 'Inativo'}
                                </span>
                            </td>

                            <td className={styles.td} style={{ textAlign: 'right' }}>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.actionBtn}
                                        onClick={() => onEdit(product)}
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                        onClick={() => onDelete(product)}
                                        title="Excluir"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>

                            {/* --- Mobile View Overrides (Injected via JS for State handling) --- */}
                            {/* 
                                Note: Trying to make a single DOM structure work for both table and flex-card 
                                is tricky with React events. 
                                Instead, we will use a Conditional Rendering approach for the MOBILE CONTENT
                                inside the row if we detect we are in mobile, OR we just trust CSS.
                                
                                The CSS `display: none` on `thead` helps.
                                But transforming TR/TD into Flex blocks is the way.
                                
                                However, to handle the "Expand" logic, we need a button that only shows on mobile.
                            */}
                            <td className={styles.mobileOnlyTrigger} style={{ display: 'none' }}>
                                {/* This will be handled by the CSS logic to hide normal TDs and show this custom structure? 
                                    Actually, simpler approach:
                                    Render a DIV structure for mobile exclusively if strict separation is needed, 
                                    OR use the CSS-only approach where "Expand" is just a button always there but hidden on desktop.
                                */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 
                ALTERNATIVE: Pure Mobile List Rendering 
                (Easier to maintain than hacking a Table into a Card via CSS only)
            */}
            <div className={styles.mobileList} style={{ display: 'none' }}>
                {/* This section will be made visible by CSS Media Query @media (max-width: 768px) 
                     AND the table above will be hidden.
                 */}
            </div>

            {/* 
               Let's refactor to the Hybrid Approach:
               Two separate render trees? No, duplication.
               
               Let's stick to the CSS Module provided in the previous step.
               I need to adjust the JSX to match the CSS expectation.
               The CSS sets `.table, .thead` to `display: none` on mobile.
               And `.tbody` to `flex`.
               
               So inside the loop, we need to output the structure that matches 
               `.mobileHeader` class provided in CSS.
            */}
        </div>
    );
};

// RE-WRITING COMPONENT to match the CSS Strategy perfectly
const AdminProductTableFinal = ({ products, onEdit, onDelete, onToggleStatus }) => {
    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (id) => {
        setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
    };

    if (!products || products.length === 0) return <div className="p-4 text-center text-gray-500">Sem produtos.</div>;

    return (
        <div className={styles.container}>
            {/* Desktop Header */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Produto</th>
                        <th className={styles.th}>Categoria</th>
                        <th className={styles.th}>Preço</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th} style={{ textAlign: 'right' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className={styles.row}>
                            {/* ID */}
                            <td className={styles.td}>
                                {/* Mobile Header Layout inside the first cell? No, let's use the CSS-Card pattern. */}
                                <span className={styles.mobileId}>#{product.display_id}</span>
                            </td>

                            {/* Name & Image */}
                            <td className={styles.td}>
                                <div className={styles.productInfo}>
                                    <img src={product.image_url} alt="" className={styles.productImage} />
                                    <span className={styles.mobileName}>{product.name}</span>
                                </div>
                            </td>

                            {/* Category */}
                            <td className={styles.td}>
                                {product.categories?.name}
                            </td>

                            {/* Price */}
                            <td className={styles.td}>
                                R$ {Number(product.price).toFixed(2)}
                            </td>

                            {/* Status */}
                            <td className={styles.td}>
                                <span className={`${styles.statusBadge} ${product.is_active ? styles.active : styles.inactive}`}>
                                    {product.is_active ? 'Ativo' : 'Inativo'}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className={styles.td} style={{ textAlign: 'right' }}>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn} onClick={() => onEdit(product)}>✏️</button>
                                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => onDelete(product)}>🗑️</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile View (Rendered Separately for Sanity) */}
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

export default AdminProductTableFinal;
