import React from 'react';
import styles from './PromoBanner.module.css';

const PromoBanner = () => {
    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.bannerContent}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '10px', color: '#1F2937' }}>
                    Abasteça sua loja<br />
                    <span style={{ color: 'var(--primary-color)' }}>30% OFF</span> hoje!
                </h2>
                <button className={styles.bannerButton}>Peça agora</button>
            </div>
            <div className={styles.bannerImagePlaceholder}>
                {/* Placeholder for fresh veggie image */}
                <span style={{ fontSize: '3rem' }}>🥦</span>
            </div>
        </div>
    );
};

export default PromoBanner;
