import React, { useState } from 'react';
import {
    Award,
    Plus,
    Users,
    ShieldCheck,
    History
} from 'lucide-react';

import VendorStats from './components/VendorStats';
import VendorList from './components/VendorList';
import VendorForm from './components/VendorForm';
import VendorTiering from './components/VendorTiering';
import VendorKYC from './components/VendorKYC';
import VendorLogs from './components/VendorLogs';
import Toast from '../../components/common/Toast/Toast';

import './Vendors.css';

const VendorManagement = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showForm, setShowForm] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleEditVendor = (vendor) => {
        setEditingVendor(vendor);
        setShowForm(true);
    };

    const handleStatusToggle = (vendor) => {
        const newStatus = vendor.status === 'Active' ? 'Deactivated' : 'Activated';
        showToast(`${vendor.name} has been ${newStatus}.`, 'success');
    };

    const handleDeleteVendor = (vendor) => {
        showToast(`${vendor.name} has been deleted.`, 'success');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <VendorStats />
                        <div style={{ marginTop: '24px' }}>
                            <div className="vendor-module-header">
                                <h3>Active Partners</h3>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="action-btn primary" onClick={() => { setEditingVendor(null); setShowForm(true); }}>
                                        <Plus size={18} /> Add New Vendor
                                    </button>
                                </div>
                            </div>
                            <VendorList
                                onEdit={handleEditVendor}
                                onStatusToggle={handleStatusToggle}
                                onDelete={handleDeleteVendor}
                                showToast={showToast}
                                onTabChange={setActiveTab}
                            />
                        </div>
                    </>
                );
            case 'tiering':
                return <VendorTiering />;
            case 'kyc':
                return <VendorKYC showToast={showToast} />;
            case 'logs':
                return <VendorLogs showToast={showToast} />;
            default:
                return null;
        }
    };

    return (
        <div className="management-module">
            <div className="vendor-module-header">
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Vendor Portal Management</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                        Manage platform partners, onboarding, and kyc verification
                    </p>
                </div>
                {!showForm && (
                    <div className="vendor-tabs">
                        <button
                            className={`vendor-tab ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <Users size={16} /> Overview
                        </button>
                        <button
                            className={`vendor-tab ${activeTab === 'kyc' ? 'active' : ''}`}
                            onClick={() => setActiveTab('kyc')}
                        >
                            <ShieldCheck size={16} /> KYC Verification
                        </button>
                        <button
                            className={`vendor-tab ${activeTab === 'tiering' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tiering')}
                        >
                            <Award size={16} /> Tier Management
                        </button>
                        <button
                            className={`vendor-tab ${activeTab === 'logs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('logs')}
                        >
                            <History size={16} /> Activity Logs
                        </button>
                    </div>
                )}
            </div>

            {renderContent()}

            {showForm && (
                <VendorForm
                    initialData={editingVendor}
                    onCancel={() => { setShowForm(false); setEditingVendor(null); }}
                    onSave={(name) => {
                        setShowForm(false);
                        setEditingVendor(null);
                        showToast(`Vendor ${name} ${editingVendor ? 'updated' : 'registered'} successfully!`, 'success');
                    }}
                />
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

export default VendorManagement;
