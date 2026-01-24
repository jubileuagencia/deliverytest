import React from 'react';

const Hero = () => {
    return (
        <section style={styles.section}>
            <div className="container">
                <h1 className="premium-gradient-text" style={styles.title}>Delicious Food</h1>
                <p style={styles.subtitle}>Delivered right to your doorstep.</p>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '40px 0',
        textAlign: 'center',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '10px',
    },
    subtitle: {
        color: 'var(--text-secondary)',
        fontSize: '1.1rem',
    },
};

export default Hero;
