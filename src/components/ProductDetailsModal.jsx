import React, { useEffect, useState, useRef } from 'react';
import { getProductById } from '../services/products';
import styles from './ProductDetailsModal.module.css';

const ProductDetailsModal = ({ productId, onClose, onAddToCart, cartItems, onUpdateQuantity, onRemoveItem }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [closing, setClosing] = useState(false);

    // Gesture State
    const [dragY, setDragY] = useState(0);
    const startY = useRef(0);
    const isDragging = useRef(false);
    const contentRef = useRef(null);

    const cartItem = cartItems?.find(item => item.id === product?.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                if (typeof productId === 'object') {
                    setProduct(productId);
                    setLoading(false);
                } else {
                    const data = await getProductById(productId);
                    setProduct(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Failed to load product", error);
                setLoading(false);
            }
        };

        if (productId) {
            loadProduct();
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [productId]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
            setClosing(false);
            setDragY(0);
        }, 300);
    };

    const handleIncrement = () => {
        onUpdateQuantity(product.id, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onUpdateQuantity(product.id, quantity - 1);
        } else {
            onRemoveItem(product.id);
        }
    };

    // Touch Handlers
    const handleTouchStart = (e) => {
        // Only allow dragging if at top of scroll
        if (contentRef.current && contentRef.current.scrollTop > 5) return;

        startY.current = e.touches[0].clientY;
        isDragging.current = true;
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;

        // Only allow dragging down
        if (diff > 0) {
            setDragY(diff);
            // Prevent default to stop scrolling while dragging
            if (e.cancelable) e.preventDefault();
        }
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
        if (dragY > 100) { // Threshold to close
            handleClose();
        } else {
            setDragY(0); // Snap back
        }
    };

    if (!productId && !closing) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div
                className={styles.sheet}
                style={{
                    transform: closing ? 'translateY(100%)' : `translateY(${dragY}px)`,
                    transition: isDragging.current ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Visual Handle / Drag Area */}
                <div
                    className={styles.dragArea}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={styles.handle}></div>
                </div>

                {loading ? (
                    <div className={styles.loading}>Carregando...</div>
                ) : !product ? (
                    <div className={styles.error}>Produto não encontrado.</div>
                ) : (
                    <>
                        {/* Scrollable Content Wrapper - Contains Image AND Details */}
                        <div className={styles.content} ref={contentRef}>

                            {/* Header Image Area (Now inside scrollable area) */}
                            <div className={styles.headerImageArea}>
                                <button className={styles.closeButton} onClick={handleClose}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                </button>

                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className={styles.productImage} />
                                ) : (
                                    <div className={styles.placeholder}>🥦</div>
                                )}

                                <div className={styles.imageOverlay} />
                            </div>

                            <div className={styles.detailsBody}>
                                <div className={styles.detailsHeader}>
                                    <h1 className={styles.title}>{product.name}</h1>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
                                        <span className={styles.unit}>/ unidade</span>
                                    </div>
                                </div>

                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>Descrição</h3>
                                    <p className={styles.description}>
                                        {product.description || "Sem descrição disponível para este produto."}
                                    </p>
                                </div>

                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>Categoria</h3>
                                    <div className={styles.badgeWrapper}>
                                        <span className={styles.badge}>
                                            {product.categories?.name || "Geral"}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ height: '100px' }}></div>
                            </div>
                        </div>

                        {/* Fixed Bottom Action Bar */}
                        <div className={styles.actionBar}>
                            {quantity === 0 ? (
                                <button
                                    className={styles.addButton}
                                    onClick={() => onAddToCart(product)}
                                >
                                    Adicionar à Sacola - R$ {product.price.toFixed(2).replace('.', ',')}
                                </button>
                            ) : (
                                <div className={styles.quantityControl}>
                                    <button className={styles.qtyButton} onClick={handleDecrement}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    <div className={styles.qtyInfo}>
                                        <span className={styles.qtyValue}>{quantity}</span>
                                        <span className={styles.qtyLabel}>unidades</span>
                                    </div>
                                    <button className={styles.qtyButton} onClick={handleIncrement}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsModal;
