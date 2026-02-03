import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    className,
    onClick,
    ...props
}) => {
    const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-200 border border-transparent",
        outline: "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5",
        ghost: "bg-transparent text-gray-400 hover:text-white"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={twMerge(baseStyles, variants[variant], className)}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default Button;
