import React, { useState } from 'react';
import { X, Shield, Check } from 'lucide-react';

const SubAdminPermissions = ({ user, onClose, onSave }) => {
    const modules = [
        { id: 'dashboard', name: 'Dashboard', desc: 'Overview, analytics and reports' },
        { id: 'subadmins', name: 'Sub-Admin Management', desc: 'Manage system administrator accounts' },
        { id: 'vendors', name: 'Vendor Management', desc: 'Handle applications, KYC and tiering' },
        { id: 'customers', name: 'Customer Management', desc: 'Client accounts and support tickets' },
        { id: 'delivery', name: 'Delivery Tracking', desc: 'Live tracking and rider management' },
        { id: 'settings', name: 'System Settings', desc: 'Core platform configurations' },
        { id: 'orders', name: 'Order Management', desc: 'Track and manage customer orders' },
        { id: 'products', name: 'Product Inventory', desc: 'Manage catalogue and item stock' }
    ];

    const [permissions, setPermissions] = useState(user?.permissions || []);

    const handleToggle = (id) => {
        setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    };

    const handleFullAccess = () => {
        setPermissions(permissions.length === modules.length ? [] : modules.map(m => m.id));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content wide" style={{ height: 'auto', maxHeight: '95vh' }}>
                <div className="modal-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={22} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>Access Permissions</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Configure module access for <strong>{user?.name}</strong></p>
                        </div>
                    </div>
                    <button className="icon-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body" style={{ overflowY: 'visible' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                        <div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Modular Access Control</span>
                            <p className="text-secondary" style={{ fontSize: '0.8rem', margin: '2px 0 0 0' }}>{permissions.length} modules selected for this administrator</p>
                        </div>
                        <button className="action-btn secondary sm" onClick={handleFullAccess}>
                            {permissions.length === modules.length ? 'Revoke All Access' : 'Grant Full Access'}
                        </button>
                    </div>

                    <div className="permission-grid">
                        {modules.map(module => (
                            <div
                                key={module.id}
                                className={`permission-item ${permissions.includes(module.id) ? 'active' : ''}`}
                                onClick={() => handleToggle(module.id)}
                            >
                                <div className={`checkbox-circle ${permissions.includes(module.id) ? 'checked' : ''}`}>
                                    {permissions.includes(module.id) && <Check size={14} strokeWidth={3} />}
                                </div>
                                <div className="permission-info">
                                    <strong style={{ color: permissions.includes(module.id) ? 'var(--primary-color)' : '#1e293b' }}>{module.name}</strong>
                                    <p>{module.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '40px', padding: '24px 0 0 0', borderTop: '1px solid #f1f5f9' }}>
                        <button className="action-btn secondary" style={{ flex: 1, height: '48px' }} onClick={onClose}>Discard Changes</button>
                        <button className="action-btn primary" style={{ flex: 2, height: '48px' }} onClick={() => onSave(permissions)}>Update User Permissions</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubAdminPermissions;
