import React, { useEffect, useState, useRef } from 'react';
import { getProductById } from '../services/products';

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

    // Dynamic style for dragging
    const sheetStyle = {
        ...styles.sheet,
        transform: closing ? 'translateY(100%)' : `translateY(${dragY}px)`,
        transition: isDragging.current ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    };

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div
                style={sheetStyle}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Visual Handle / Drag Area */}
                <div
                    style={styles.dragArea}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div style={styles.handle}></div>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>Carregando...</div>
                ) : !product ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>Produto não encontrado.</div>
                ) : (
                    <>
                        {/* Scrollable Content Wrapper - Contains Image AND Details */}
                        <div style={styles.content} ref={contentRef}>

                            {/* Header Image Area (Now inside scrollable area) */}
                            <div style={styles.headerImageArea}>
                                <button style={styles.closeButton} onClick={handleClose}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                </button>

                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} style={styles.image} />
                                ) : (
                                    <div style={styles.placeholder}>🥦</div>
                                )}

                                <div style={styles.imageOverlay} />
                            </div>

                            <div style={styles.detailsBody}>
                                <div style={styles.detailsHeader}>
                                    <h1 style={styles.title}>{product.name}</h1>
                                    <div style={styles.priceContainer}>
                                        <span style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
                                        <span style={styles.unit}>/ unidade</span>
                                    </div>
                                </div>

                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Descrição</h3>
                                    <p style={styles.description}>
                                        {product.description || "Sem descrição disponível para este produto."}
                                    </p>
                                </div>

                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Categoria</h3>
                                    <div style={styles.badgeWrapper}>
                                        <span style={styles.badge}>
                                            {product.categories?.name || "Geral"}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ height: '100px' }}></div>
                            </div>
                        </div>

                        {/* Fixed Bottom Action Bar */}
                        <div style={styles.actionBar}>
                            {quantity === 0 ? (
                                <button
                                    style={styles.addButton}
                                    onClick={() => onAddToCart(product)}
                                >
                                    Adicionar à Sacola - R$ {product.price.toFixed(2).replace('.', ',')}
                                </button>
                            ) : (
                                <div style={styles.quantityControl}>
                                    <button style={styles.qtyButton} onClick={handleDecrement}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    <div style={styles.qtyInfo}>
                                        <span style={styles.qtyValue}>{quantity}</span>
                                        <span style={styles.qtyLabel}>unidades</span>
                                    </div>
                                    <button style={styles.qtyButton} onClick={handleIncrement}>
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

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)',
    },
    sheet: {
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '600px', // Mobile-first, but constrained width on desktop
        height: '96%', // Almost full height
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    dragArea: {
        width: '100%',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20,
        cursor: 'grab',
    },
    handle: {
        width: '40px',
        height: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Visible on image
        borderRadius: '3px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
    },
    headerImageArea: {
        width: '100%',
        height: '300px',
        position: 'relative',
        backgroundColor: '#F3F4F6',
        // flexShrink: 0, // Removed to allow scrolling with content
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '5rem',
        backgroundColor: '#E5E7EB',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
    },
    closeButton: {
        position: 'absolute',
        top: '16px',
        left: '16px', // Left side as per common pattern, or right? Requirement said "Arrow Down".
        // Usually Close is on Left or Right. Let's put it Top Left for "Back/Down".
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        color: '#1F2937',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: 0, // Remove padding from container, applied to detailsBody
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
    },
    detailsBody: {
        padding: '24px', // Padding applied here
    },
    detailsHeader: {
        marginBottom: '24px',
        borderBottom: '1px solid #F3F4F6',
        paddingBottom: '20px',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '8px',
        lineHeight: 1.2,
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#22C55E',
    },
    unit: {
        fontSize: '1rem',
        color: '#6B7280',
    },
    section: {
        marginBottom: '24px',
    },
    sectionTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px',
    },
    description: {
        fontSize: '1rem',
        color: '#6B7280',
        lineHeight: 1.6,
    },
    badgeWrapper: {
        display: 'flex',
        gap: '10px',
    },
    badge: {
        padding: '6px 12px',
        backgroundColor: '#F3F4F6',
        color: '#4B5563',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '500',
    },
    actionBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px 24px', // Extra bottom padding for safe area
        backgroundColor: '#fff',
        borderTop: '1px solid #E5E7EB',
        zIndex: 30, // Above content
    },
    addButton: {
        width: '100%',
        backgroundColor: '#22C55E',
        color: '#fff',
        border: 'none',
        padding: '16px',
        borderRadius: '16px',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
        transition: 'background 0.2s',
    },
    quantityControl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderRadius: '16px',
        padding: '8px 12px',
        border: '1px solid #E5E7EB',
    },
    qtyButton: {
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        cursor: 'pointer',
        color: '#1F2937',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    qtyInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    qtyValue: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1F2937',
    },
    qtyLabel: {
        fontSize: '0.75rem',
        color: '#9CA3AF',
        fontWeight: '500',
    },
};

export default ProductDetailsModal;
