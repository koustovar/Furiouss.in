import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className={`bg-surface border border-white/5 rounded-2xl p-6 hover:bg-surface/80 hover:border-primary/30 transition-all duration-300 group ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;
