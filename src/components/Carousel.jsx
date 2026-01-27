import React from 'react';
import ProductCard from './ProductCard';

const Carousel = ({ products, onAdd }) => {
    return (
        <div style={styles.carouselContainer}>
            <div style={styles.scrollArea}>
                <div style={styles.spacer} /> {/* Left padding spacer */}
                {products.map((product) => (
                    <div key={product.id} style={styles.cardWrapper}>
                        <ProductCard product={product} onAdd={onAdd} />
                    </div>
                ))}
                <div style={styles.spacer} /> {/* Right padding spacer */}
            </div>
        </div>
    );
};

const styles = {
    carouselContainer: {
        width: '100%',
        padding: '10px 0', // Reduced from 40px
    },
    heading: {
        marginBottom: '20px',
        fontSize: '1.8rem',
        fontWeight: 700,
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
        scrollSnapAlign: 'center',
        padding: '0 10px',
        flexShrink: 0,
    },
    spacer: {
        width: '10px', // Half of container padding
        flexShrink: 0,
    },
};

export default Carousel;
