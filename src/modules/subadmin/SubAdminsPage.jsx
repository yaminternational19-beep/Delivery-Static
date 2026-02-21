import React, { useState } from 'react';
import { Users, Shield, Terminal } from 'lucide-react';
import SubAdminList from './components/SubAdminList';
import SubAdminForm from './components/SubAdminForm';
import SubAdminPermissions from './components/SubAdminPermissions';
import SubAdminStats from './components/SubAdminStats';
import AccessLogs from './components/AccessLogs';
import Toast from '../../components/common/Toast/Toast';
import './SubAdmins.css';

const SubAdminsPage = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [modal, setModal] = useState({ open: false, type: null, user: null });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleSaveSubAdmin = (data) => {
        console.log('Saving Sub-Admin Data:', data);
        setModal({ open: false, type: null, user: null });
        showToast(data.id ? 'Sub-Admin details updated successfully' : 'New Sub-Admin account has been created', 'success');
    };

    const handleSavePermissions = (permissions) => {
        console.log('Saving Permissions for sub-admin:', modal.user?.name, permissions);
        setModal({ open: false, type: null, user: null });
        showToast(`Access permissions for ${modal.user?.name} updated`, 'success');
    };

    const handleDeactivate = (user) => {
        const action = user.status === 'Active' ? 'deactivated' : 'activated';
        showToast(`Account for ${user.name} has been ${action}`, 'info');
    };

    const handleDelete = (user) => {
        showToast(`Sub-Admin ${user.name} removed from system`, 'error');
    };

    return (
        <div className="subadmin-module management-module" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Toast Notification - Floating at Right Top */}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            {/* Page Header */}
            <div className="module-intro">
                <div className="intro-content">
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Sub-Admin Management</h1>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Manage system administrators and their relative permissions</p>
                </div>
                {activeTab === 'users' && (
                    <button
                        className="btn btn-primary"
                        onClick={() => setModal({ open: true, type: 'form', user: null })}
                    >
                        <Users size={18} />
                        Add New Sub-Admin
                    </button>
                )}
            </div>

            {/* Stats Section */}
            <SubAdminStats />

            {/* Tabs */}
            <div className="tab-group-pills">
                <button
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    <Shield size={14} />
                     Sub-Admins
                </button>
                <button
                    className={activeTab === 'logs' ? 'active' : ''}
                    onClick={() => setActiveTab('logs')}
                >
                    <Terminal size={14} /> 
                    Access Logs
                </button>
            </div>


            {/* Content Area */}
            {activeTab === 'users' ? (
                <SubAdminList
                    onEdit={(user) => setModal({ open: true, type: 'form', user })}
                    onEditPermissions={(user) => setModal({ open: true, type: 'permissions', user })}
                    onDeactivate={handleDeactivate}
                    onDelete={handleDelete}
                    onShowToast={showToast}
                />
            ) : (
                <AccessLogs onShowToast={showToast} />
            )}

            {/* Modals */}
            {modal.open && modal.type === 'form' && (
                <SubAdminForm
                    user={modal.user}
                    onClose={() => setModal({ open: false, type: null, user: null })}
                    onSave={handleSaveSubAdmin}
                />
            )}

            {modal.open && modal.type === 'permissions' && (
                <SubAdminPermissions
                    user={modal.user}
                    onClose={() => setModal({ open: false, type: null, user: null })}
                    onSave={handleSavePermissions}
                />
            )}
        </div>
    );
};

export default SubAdminsPage;
