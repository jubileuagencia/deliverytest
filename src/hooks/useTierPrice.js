import { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { supabase } from '../lib/supabase';

export const useTierPrice = (basePrice) => {
    const [finalPrice, setFinalPrice] = useState(basePrice);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [tier, setTier] = useState('bronze');

    // Usage of Global Context
    const { config } = useConfig();

    // 1. Fetch User Tier (Ideally from AuthContext, keeping here for now)
    useEffect(() => {
        const fetchTier = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('tier')
                    .eq('id', user.id)
                    .single();

                if (profile?.tier) {
                    setTier(profile.tier);
                }
            }
        };
        fetchTier();
    }, []);

    // 2. Calculate Price (Reacting to Context Changes)
    useEffect(() => {
        if (!basePrice || tier === 'bronze') {
            setFinalPrice(basePrice);
            setDiscountApplied(false);
            return;
        }

        // Access nested tier_discounts from context config
        const discounts = config.tier_discounts || {};
        const discountPercent = discounts[tier] || 0;

        if (discountPercent > 0) {
            const discountAmount = basePrice * discountPercent;
            const newPrice = basePrice - discountAmount;
            setFinalPrice(newPrice);
            setDiscountApplied(true);
        } else {
            setFinalPrice(basePrice);
            setDiscountApplied(false);
        }

    }, [basePrice, tier, config]); // Re-run when context config updates

    return {
        finalPrice,
        discountApplied,
        originalPrice: basePrice,
        tier
    };
};
