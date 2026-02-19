import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

const CATEGORIES_DATA = {
    'Electronics': ['Mobile Phones', 'Laptops', 'Smart Watches', 'Accessories'],
    'Spices & Herbs': ['Dried Herbs', 'Seeds', 'Powder Spices'],
    'Vegetables': ['Leafy Greens', 'Root Vegetables', 'Potatoes'],
    'Fruits': ['Fresh Fruits', 'Dry Fruits', 'Tropical Fruits'],
    'Dairy & Eggs': ['Milk', 'Cheese', 'Butter'],
    'Bakery': ['Bread', 'Cakes', 'Pastries']
};

const QuantityForm = ({ initialData, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        shortCode: '',
        category: '',
        subCategory: '',
        status: 'Active'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleCategoryChange = (val) => {
        setFormData({ ...formData, category: val, subCategory: '' });
    };

    return (
        <div className="modal-overlay">
            <div className="q-card" style={{ width: '500px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
                        {initialData ? 'Edit Quantity Unit' : 'Add New Unit'}
                    </h3>
                    <button className="icon-btn" onClick={onCancel}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                                Category *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', appearance: 'none', background: 'white' }}
                                    value={formData.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(CATEGORIES_DATA).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                                Sub Category *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', appearance: 'none', background: 'white' }}
                                    value={formData.subCategory}
                                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                    required
                                    disabled={!formData.category}
                                >
                                    <option value="">Select Sub Category</option>
                                    {formData.category && CATEGORIES_DATA[formData.category].map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                                Unit Name *
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Kilogram"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                                Unit Code *
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. kg"
                                value={formData.shortCode}
                                onChange={(e) => setFormData({ ...formData, shortCode: e.target.value })}
                                required
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Status</label>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Active"
                                    checked={formData.status === 'Active'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                />
                                Active
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Inactive"
                                    checked={formData.status === 'Inactive'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                />
                                Inactive
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button type="button" className="action-btn secondary" onClick={onCancel} style={{ flex: 1 }}>
                            Cancel
                        </button>
                        <button type="submit" className="action-btn primary" style={{ flex: 1 }}>
                            {initialData ? 'Update Unit' : 'Create Unit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuantityForm;
