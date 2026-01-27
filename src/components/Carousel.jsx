import React from 'react';
import ProductCard from './ProductCard';

const Carousel = ({ products, onAdd, onClick }) => {
    return (
        <div style={styles.carouselContainer}>
            <div style={styles.scrollArea}>
                <div style={styles.spacer} /> {/* Left padding matcher */}
                {products.map((product) => (
                    <div key={product.id} style={styles.cardWrapper}>
                        <ProductCard product={product} onAdd={onAdd} onClick={onClick} />
                    </div>
                ))}
                <div style={styles.endSpacer} /> {/* Minimal right padding */}
            </div>
        </div>
    );
};

const styles = {
    carouselContainer: {
        width: 'calc(100% + 40px)', // Compensate for container padding (20px * 2)
        marginLeft: '-20px',
        marginRight: '-20px',
        padding: '10px 0',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '1.8rem',
        fontWeight: 700,
        paddingLeft: '20px', // Restore heading alignment
    },
    scrollArea: {
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        paddingBottom: '20px', // Space for scrollbar or shadow
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
        WebkitOverflowScrolling: 'touch',
    },
    cardWrapper: {
        scrollSnapAlign: 'start',
        padding: '0 5px',
        flexShrink: 0,
        width: '200px',
    },
    spacer: {
        width: '20px', // Match container padding for left alignment
        flexShrink: 0,
    },
    endSpacer: {
        width: '5px', // Minimal padding at the end
        flexShrink: 0,
    }
};

export default Carousel;
