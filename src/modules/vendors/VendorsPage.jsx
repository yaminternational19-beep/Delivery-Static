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
                    <VendorList
                        onEdit={handleEditVendor}
                        onStatusToggle={handleStatusToggle}
                        onDelete={handleDeleteVendor}
                        showToast={showToast}
                        onTabChange={setActiveTab}
                    />
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
        <div className="page-wrapper">
            {/* Toast Notification - Floating at Right Top */}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            {/* Page Header */}
            <div className="list-header" style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className="header-title" style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>Vendor Management</h1>
                    <p className="header-subtitle" style={{ fontSize: '1rem', color: '#64748b' }}>Manage platform partners, onboarding, and kyc verification</p>
                </div>
                {!showForm && activeTab === 'overview' && (
                    <button
                        className="btn btn-primary"
                        onClick={() => { setEditingVendor(null); setShowForm(true); }}
                        style={{ height: '44px', padding: '0 24px', fontSize: '15px' }}
                    >
                        <Plus size={20} /> Add New Vendor
                    </button>
                )}
            </div>

            {!showForm && (
                <>
                    <VendorStats />

                    {/* Tabs */}
                    <div className="flex gap-md mb-4" style={{ marginBottom: '24px', marginTop: '24px' }}>
                        <button
                            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveTab('overview')}
                            style={{ padding: '0 24px' }}
                        >
                            Overview
                        </button>
                        <button
                            className={`btn ${activeTab === 'kyc' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveTab('kyc')}
                            style={{ padding: '0 24px' }}
                        >
                            KYC Verification
                        </button>
                        <button
                            className={`btn ${activeTab === 'tiering' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveTab('tiering')}
                            style={{ padding: '0 24px' }}
                        >
                            Tier Management
                        </button>
                        <button
                            className={`btn ${activeTab === 'logs' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveTab('logs')}
                            style={{ padding: '0 24px' }}
                        >
                            Activity Logs
                        </button>
                    </div>
                </>
            )}

            <div className="content-container">
                {renderContent()}
            </div>

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
        </div>
    );
};

export default VendorManagement;
