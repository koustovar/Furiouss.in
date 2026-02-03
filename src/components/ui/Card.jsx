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
            className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;
