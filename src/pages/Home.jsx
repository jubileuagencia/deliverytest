import React, { useState, useEffect } from 'react';
import FeaturedProducts from '../components/FeaturedProducts';
import { getCategories } from '../services/products';
import HomeSearchBar from '../components/home/HomeSearchBar';
import PromoBanner from '../components/home/PromoBanner';
import CategorySection from '../components/home/CategorySection';
import BottomNavigation from '../components/layout/BottomNavigation';
import styles from './Home.module.css';

const Home = ({ onAddToCart, onProductClick }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <main className="container" style={{ paddingBottom: '80px', paddingTop: '10px' }}>
            <HomeSearchBar />
            <PromoBanner />
            <CategorySection categories={categories} />

            {/* Products */}
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Ofertas do Dia</h3>
                <span className={styles.seeAll}>Ver todas</span>
            </div>
            <FeaturedProducts onAddToCart={onAddToCart} onProductClick={onProductClick} />

            <BottomNavigation />
        </main>
    );
};

export default Home;
