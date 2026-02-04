import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartNotification.module.css';

import { getAppConfig } from '../services/config';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

const CartNotification = ({ cartItems, onClose, hasBottomNav }) => {
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const [displayTotal, setDisplayTotal] = useState(0);

    useEffect(() => {
        const calcTotal = async () => {
            const baseSubtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

            // Simple fetch for notification (Logic duplication accepted for independence)
            const { data: { user } } = await supabase.auth.getUser();
            let tier = 'bronze';
            if (user) {
                const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
                if (profile) tier = profile.tier;
            }

            const config = await getAppConfig('tier_discounts');
            const discountPercent = (config && config[tier]) || 0;
            const final = baseSubtotal - (baseSubtotal * discountPercent);

            setDisplayTotal(final);
        };
        calcTotal();
    }, [cartItems]);

    if (itemCount === 0) return null;

    return (
        <div
            className={styles.container}
            style={{ bottom: hasBottomNav ? '80px' : '20px' }}
        >
            <div className={styles.info}>
                <span className={styles.label}>Total</span>
                <div className={styles.values}>
                    <span className={styles.price}>R$ {displayTotal.toFixed(2).replace('.', ',')}</span>
                    <span className={styles.count}> / {itemCount} itens</span>
                </div>
            </div>
            <Link to="/carrinho" className={styles.button} onClick={onClose}>
                Ver sacola
            </Link>
        </div>
    );
};

export default CartNotification;
