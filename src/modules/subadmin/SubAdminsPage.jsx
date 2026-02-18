import React, { useState } from 'react';
import { Users, ClipboardList } from 'lucide-react';
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
        showToast(data.id ? 'Sub-Admin details updated successfully!' : 'New Sub-Admin created successfully!', 'success');
    };

    const handleSavePermissions = (permissions) => {
        console.log('Saving Permissions for sub-admin:', modal.user?.name, permissions);
        setModal({ open: false, type: null, user: null });
        showToast(`Permissions for ${modal.user?.name} changed successfully!`, 'success');
    };

    const handleDeactivate = (user) => {
        showToast(`Sub-Admin ${user.name} has been deactivated.`, 'info');
    };

    const handleDelete = (user) => {
        showToast(`Sub-Admin ${user.name} has been removed.`, 'error');
    };

    return (
        <div className="management-module">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            <div className="module-intro" style={{ marginBottom: '16px' }}>
                <div className="intro-content">
                    <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>Sub-Admin Management</h1>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>Manage system administrators and their relative permissions</p>
                </div>
                <div className="tab-group-pills">
                    <button
                        className={activeTab === 'users' ? 'active' : ''}
                        onClick={() => setActiveTab('users')}
                    >
                        Sub-Admins
                    </button>
                    <button
                        className={activeTab === 'logs' ? 'active' : ''}
                        onClick={() => setActiveTab('logs')}
                    >
                        Access Logs
                    </button>
                </div>
            </div>

            <SubAdminStats />

            <div className="section-header-row">
                <h3>{activeTab === 'users' ? 'Active Sub-Admins' : 'Activity Logs'}</h3>
                {activeTab === 'users' && (
                    <button
                        className="action-btn primary"
                        onClick={() => setModal({ open: true, type: 'form', user: null })}
                        style={{ padding: '10px 20px' }}
                    >
                        <Users size={18} style={{ marginRight: '8px' }} />
                        Add New Sub-Admin
                    </button>
                )}
            </div>

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
