import React, { useState, useEffect } from 'react';
import { X, Upload, Award } from 'lucide-react';

const BrandForm = ({ initialData, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        subCategoryId: '',
        logo: '',
        description: '',
        status: 'Active'
    });

    // Mock categories and subcategories
    const categories = [
        { id: 'CAT001', name: 'Electronics' },
        { id: 'CAT005', name: 'Fashion' }
    ];

    const subCategories = [
        { id: 'SC001', name: 'Mobile Phones', catId: 'CAT001' },
        { id: 'SC002', name: 'Laptops', catId: 'CAT001' },
        { id: 'SC006', name: 'Footwear', catId: 'CAT005' }
    ];

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="card" style={{ width: '500px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0 }}>{initialData ? 'Edit Brand' : 'Add New Brand'}</h3>
                    <button className="icon-btn" onClick={onCancel}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            className="input-field"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Sub Category</label>
                        <select
                            className="input-field"
                            value={formData.subCategoryId}
                            onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value })}
                            required
                        >
                            <option value="">Select Sub Category</option>
                            {subCategories.filter(sc => !formData.categoryId || sc.catId === formData.categoryId).map(sc => (
                                <option key={sc.id} value={sc.id}>{sc.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Brand Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Apple, Nike"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Brand Logo</label>
                        <div style={{
                            border: '2px dashed var(--border-color)',
                            borderRadius: '8px',
                            padding: '20px',
                            textAlign: 'center',
                            background: '#f8fafc',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <Upload size={18} color="var(--primary-color)" />
                            </div>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Upload brand logo or icon</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Brand Description</label>
                        <textarea
                            className="input-field"
                            rows="2"
                            placeholder="Brief details about the brand..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Active"
                                    checked={formData.status === 'Active'}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                />
                                Active
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
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
                        <button type="button" className="action-btn secondary" onClick={onCancel} style={{ flex: 1 }}>Cancel</button>
                        <button type="submit" className="action-btn primary" style={{ flex: 1 }}>
                            {initialData ? 'Save Changes' : 'Create Brand'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BrandForm;
