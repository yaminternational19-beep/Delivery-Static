import React, { useState } from 'react';
import { Bike, Truck, Car, ShoppingBag, Plus, Edit2, Trash2, CheckCircle2, XCircle, X, Info } from 'lucide-react';
import Toast from '../../components/common/Toast/Toast';
import './Vehicles.css';

const VehicleTypesPage = () => {
    const [vehicleTypes, setVehicleTypes] = useState([
        { id: 1, name: 'Bicycle', icon: ShoppingBag, description: 'Eco-friendly short distance delivery for small packages and documents.', status: 'Active', iconType: 'ShoppingBag' },
        { id: 2, name: 'Motorbike', icon: Bike, description: 'Standard quick delivery vehicle for most food and small grocery orders.', status: 'Active', iconType: 'Bike' },
        { id: 3, name: 'Sedan Car', icon: Car, description: 'Secure delivery for fragile items, catering orders, and medium-sized boxes.', status: 'Active', iconType: 'Car' },
        { id: 4, name: 'Mini Truck', icon: Truck, description: 'High-capacity vehicle for furniture, bulk orders, and oversized items.', status: 'Inactive', iconType: 'Truck' }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', iconType: 'Bike' });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const toggleStatus = (id) => {
        setVehicleTypes(types => types.map(t =>
            t.id === id ? { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' } : t
        ));
        showToast('Vehicle status updated successfully');
    };

    const handleEdit = (type) => {
        setFormData({
            name: type.name,
            description: type.description,
            iconType: type.iconType || 'Bike'
        });
        setEditId(type.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const iconMap = { Bike, Truck, Car, ShoppingBag };

        if (isEditing) {
            setVehicleTypes(types => types.map(t =>
                t.id === editId ? {
                    ...t,
                    ...formData,
                    icon: iconMap[formData.iconType] || Bike
                } : t
            ));
            showToast(`${formData.name} updated successfully!`);
        } else {
            const newItem = {
                id: vehicleTypes.length + 1,
                ...formData,
                icon: iconMap[formData.iconType] || Bike,
                status: 'Active'
            };
            setVehicleTypes([...vehicleTypes, newItem]);
            showToast(`${newItem.name} registered successfully!`);
        }

        setShowForm(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: '', description: '', iconType: 'Bike' });
    };

    return (
        <div className="vehicles-module">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Vehicle Type Management</h1>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Manage your fleet categories and availability</p>
                </div>
                <button className="action-btn primary" onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: '', description: '', iconType: 'Bike' });
                    setShowForm(true);
                }}>
                    <Plus size={20} /> Add Vehicle Type
                </button>
            </div>

            <div className="vehicle-card-grid">
                {vehicleTypes.map((type) => {
                    const Icon = type.icon || ShoppingBag;
                    return (
                        <div key={type.id} className={`vehicle-type-card ${type.status === 'Active' ? 'active' : ''}`}>
                            <div className="vehicle-icon-wrapper">
                                <Icon size={32} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{type.name}</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>ID: VHT-00{type.id}</span>
                                </div>
                                <span className={`badge ${type.status === 'Active' ? 'success' : 'error'}`}>
                                    {type.status}
                                </span>
                            </div>

                            <div style={{ marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                                <div style={{ display: 'flex', gap: '8px', color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                    <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <p style={{ margin: 0 }}>{type.description}</p>
                                </div>
                            </div>

                            <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                                <button
                                    className="action-btn secondary sm"
                                    style={{ flex: 1 }}
                                    onClick={() => handleEdit(type)}
                                >
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button
                                    className={`action-btn sm ${type.status === 'Active' ? 'error-light' : 'success-light'}`}
                                    style={{ flex: 1 }}
                                    onClick={() => toggleStatus(type.id)}
                                >
                                    {type.status === 'Active' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                                    {type.status === 'Active' ? 'Disable' : 'Enable'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="zone-form-modal" style={{ maxWidth: '450px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ margin: 0 }}>{isEditing ? 'Update' : 'Create'} Vehicle Type</h2>
                            <button className="icon-btn" onClick={() => setShowForm(false)}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Vehicle Category Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Electric Scooter"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder="Explain the typical use case for this vehicle..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={3}
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Representative Icon</label>
                                <select
                                    value={formData.iconType}
                                    onChange={e => setFormData({ ...formData, iconType: e.target.value })}
                                >
                                    <option value="Bike">Motorbike / Bicycle</option>
                                    <option value="ShoppingBag">Light Carrier</option>
                                    <option value="Car">Sedan / Hatchback</option>
                                    <option value="Truck">Heavy Truck</option>
                                </select>
                            </div>

                            <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                                <button type="button" className="action-btn secondary" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="action-btn primary" style={{ flex: 2 }}>
                                    {isEditing ? 'Save Changes' : 'Register Type'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default VehicleTypesPage;

