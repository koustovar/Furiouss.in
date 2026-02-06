import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Package, X, Loader2, Upload, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const AddTemplateModal = ({ isOpen, onClose, onRefresh, editingTemplate = null }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'portfolio',
        price: '',
        image: '',
        description: '',
        features: '',
        deliveryLink: '',
        rating: 5.0
    });

    useEffect(() => {
        if (editingTemplate) {
            setFormData({
                ...editingTemplate,
                features: Array.isArray(editingTemplate.features) ? editingTemplate.features.join(', ') : editingTemplate.features,
                deliveryLink: editingTemplate.deliveryLink || ''
            });
        } else {
            setFormData({
                title: '',
                category: 'portfolio',
                price: '',
                image: '',
                description: '',
                features: '',
                deliveryLink: '',
                rating: 5.0
            });
        }
    }, [editingTemplate, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const templateData = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                rating: parseFloat(formData.rating) || 5.0,
                features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
                updatedAt: serverTimestamp()
            };

            if (editingTemplate) {
                const docRef = doc(db, 'templates', editingTemplate.id);
                await updateDoc(docRef, templateData);
            } else {
                await addDoc(collection(db, 'templates'), {
                    ...templateData,
                    createdAt: serverTimestamp()
                });
            }

            onRefresh();
            onClose();
        } catch (error) {
            console.error("Error saving template:", error);
            alert("Failed to save template. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingTemplate ? "Update Template" : "Add New Template"}
            icon={Package}
        >
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Asset Title</label>
                    <input
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Modern Portfolio Luxe"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-sm font-medium focus:border-primary/50 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-sm font-medium focus:border-primary/50 outline-none appearance-none"
                        >
                            <option value="portfolio">Portfolio</option>
                            <option value="ecommerce">E-Commerce</option>
                            <option value="business">Business</option>
                            <option value="saas">SaaS</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Price (USD)</label>
                        <input
                            required
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="49"
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-sm font-medium focus:border-primary/50 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Image URL</label>
                    <input
                        required
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-sm font-medium focus:border-primary/50 outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Description</label>
                    <textarea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Short compelling description..."
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-sm font-medium focus:border-primary/50 outline-none transition-all resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Delivery / Download Link (Sent to Customer)</label>
                    <input
                        required
                        name="deliveryLink"
                        value={formData.deliveryLink}
                        onChange={handleChange}
                        placeholder="e.g. https://drive.google.com/..."
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-sm font-medium focus:border-primary/50 outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Features (comma separated)</label>
                    <input
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        placeholder="Vite + React, Framer Motion, Tailwind..."
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-sm font-medium focus:border-primary/50 outline-none transition-all"
                    />
                </div>

                <div className="pt-4 flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 py-4 rounded-2xl"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        className="flex-[2] py-4 rounded-2xl flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingTemplate ? "Update Asset" : "Deploy Asset"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddTemplateModal;
