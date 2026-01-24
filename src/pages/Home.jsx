import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = ({ onAddToCart }) => {
    return (
        <main>
            <Hero />
            <FeaturedProducts onAddToCart={onAddToCart} />
        </main>
    );
};

export default Home;
