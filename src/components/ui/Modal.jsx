import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, icon: Icon }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-6 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-surface/90 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl backdrop-blur-xl pointer-events-auto relative overflow-hidden group"
                        >
                            {/* Animated background glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative">
                                {Icon && (
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                )}

                                {title && (
                                    <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                                        {title}
                                    </h3>
                                )}

                                <div className="text-gray-400 leading-relaxed font-medium">
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
