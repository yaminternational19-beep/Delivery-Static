import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const CategoryForm = ({ initialData, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: '',
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
const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, icon: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="modal-overlay">
            <div className="card" style={{ width: '500px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0 }}>{initialData ? 'Edit Category' : 'Add New Category'}</h3>
                    <button className="icon-btn" onClick={onCancel}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Spices & Herbs"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="input-field"
                            rows="3"
                            placeholder="Short description of the category..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* <div className="form-group">
                        <label>Category Icon / Image</label>
                        <div style={{
                            border: '2px dashed var(--border-color)',
                            borderRadius: '8px',
                            padding: '24px',
                            textAlign: 'center',
                            background: '#f8fafc',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                background: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <Upload size={20} color="var(--primary-color)" />
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Click to upload image</span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SVG, PNG, JPG (max 2MB)</span>
                        </div>
                    </div> */}
                    <div className="form-group">
                        <label>Category Icon / Image</label>
                        <div style={{
                            border: '2px dashed var(--border-color)',
                            borderRadius: '8px',
                            padding: '24px',
                            textAlign: 'center',
                            background: '#f8fafc',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                background: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                               <Upload size={20} color="var(--primary-color)" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Click to upload image</span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SVG, PNG, JPG (max 2MB)</span>
                        </div>
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

                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button type="button" className="action-btn secondary" onClick={onCancel} style={{ flex: 1 }}>Cancel</button>
                        <button type="submit" className="action-btn primary" style={{ flex: 1 }}>
                            {initialData ? 'Save Changes' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;
