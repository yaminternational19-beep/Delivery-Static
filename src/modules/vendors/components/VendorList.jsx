import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, Eye, Edit2, Trash2, CheckCircle,
    ChevronRight, Download, FileText, MoreHorizontal,
    ToggleLeft, ToggleRight, Store, User, ShieldAlert
} from 'lucide-react';

const VendorList = ({ onEdit, onStatusToggle, onDelete, showToast, onTabChange }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [tierFilter, setTierFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const vendors = [
        { id: 'VND001', name: 'Spice Garden', business: 'Spice Garden Resto', address: '123 Curry St, London', turnover: '$4,250', status: 'Active', tier: 'Gold', kyc: 'Verified' },
        { id: 'VND002', name: 'Fresh Mart', business: 'Fresh Mart Ltd', address: '45 Green Rd, NYC', turnover: '$12,800', status: 'Active', tier: 'Platinum', kyc: 'Verified' },
        { id: 'VND003', name: 'Burger King', business: 'Burger King #44', address: 'Main Sq, Berlin', turnover: '$8,400', status: 'Active', tier: 'Platinum', kyc: 'Verified' },
        { id: 'VND004', name: 'Local Cafe', business: 'The Local Sips', address: 'Small St, Paris', turnover: '$1,200', status: 'Inactive', tier: 'Silver', kyc: 'Pending' },
        { id: 'VND005', name: 'The Pizza Co.', business: 'Pizza Co. Express', address: 'Round Dr, Rome', turnover: '$2,450', status: 'Active', tier: 'Gold', kyc: 'Verified' },
    ];

    const toggleSelectAll = () => {
        if (selectedRows.length === vendors.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(vendors.map(v => v.id));
        }
    };

    const toggleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleExport = (type) => {
        if (selectedRows.length === 0) {
            showToast('Please select at least one vendor to export.', 'warning');
            return;
        }
        showToast(`Exporting ${selectedRows.length} vendors to ${type}...`, 'success');
        setSelectedRows([]);
    };

    const filteredVendors = vendors.filter(v => {
        const matchesTier = tierFilter === 'All' || v.tier === tierFilter;
        const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.business.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTier && matchesSearch;
    });

    return (
        <div className="v-table-container">
            <div className="v-table-controls">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div className="v-search">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search ID, name, business..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="input-with-icon" style={{ width: '150px' }}>
                        <Filter size={16} className="field-icon" />
                        <select
                            style={{ paddingLeft: '36px', height: '42px' }}
                            value={tierFilter}
                            onChange={(e) => setTierFilter(e.target.value)}
                        >
                            <option value="All">All Tiers</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-export-excel" onClick={() => handleExport('Excel')}>
                        <Download size={16} /> Excel {selectedRows.length > 0 && `(${selectedRows.length})`}
                    </button>
                    <button className="btn-export-pdf" onClick={() => handleExport('PDF')}>
                        <FileText size={16} /> PDF {selectedRows.length > 0 && `(${selectedRows.length})`}
                    </button>
                </div>
            </div>

            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>
                            <input
                                type="checkbox"
                                checked={selectedRows.length === vendors.length}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>PROFILE</th>
                        <th>VENDOR ID</th>
                        <th>VENDOR NAME</th>
                        <th>BUSINESS</th>
                        <th>FULL ADDRESS</th>
                        <th>TURNOVER</th>
                        <th>TIER</th>
                        <th style={{ textAlign: 'center' }}>STATUS</th>
                        <th style={{ textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVendors.map((vendor) => (
                        <tr key={vendor.id} className={selectedRows.includes(vendor.id) ? 'selected-row' : ''}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(vendor.id)}
                                    onChange={() => toggleSelectRow(vendor.id)}
                                />
                            </td>
                            <td>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: 'var(--bg-color)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <User size={16} color="var(--text-secondary)" />
                                </div>
                            </td>
                            <td><span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{vendor.id}</span></td>
                            <td><div style={{ fontWeight: 600 }}>{vendor.name}</div></td>
                            <td><div style={{ fontSize: '0.85rem' }}>{vendor.business}</div></td>
                            <td style={{ maxWidth: '200px' }}>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'normal' }}>{vendor.address}</div>
                            </td>
                            <td><div style={{ fontWeight: 600 }}>{vendor.turnover}</div></td>
                            <td>
                                <span className={`badge ${vendor.tier.toLowerCase()}`} style={{
                                    background: vendor.tier === 'Platinum' ? '#eef2ff' : vendor.tier === 'Gold' ? '#fffbeb' : '#f1f5f9',
                                    color: vendor.tier === 'Platinum' ? '#4f46e5' : vendor.tier === 'Gold' ? '#b45309' : '#475569'
                                }}>
                                    {vendor.tier}
                                </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <span className={`status-badge ${vendor.status === 'Active' ? 'success' : 'error'}`}>
                                    {vendor.status === 'Active' ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button
                                        className="action-btn-circle"
                                        onClick={() => navigate(`/vendors/${vendor.id}`, { state: { vendor } })}
                                        title="View Dashboard"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        className="action-btn-circle"
                                        onClick={() => onEdit?.(vendor)}
                                        title="Edit Vendor"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className="action-btn-circle"
                                        title="Security/KYC"
                                        onClick={() => onTabChange?.('kyc')}
                                    >
                                        <ShieldAlert size={16} />
                                    </button>
                                    <button
                                        className="action-btn-circle"
                                        onClick={() => onStatusToggle?.(vendor)}
                                        title={vendor.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    >
                                        <ToggleRight size={16} />
                                    </button>
                                    <button
                                        className="action-btn-circle delete"
                                        onClick={() => vendor.status === 'Inactive' && onDelete?.(vendor)}
                                        title="Delete"
                                        disabled={vendor.status !== 'Inactive'}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Showing {filteredVendors.length} of {vendors.length} vendors</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="mini-btn secondary" disabled>Previous</button>
                    <button className="mini-btn secondary" disabled>Next</button>
                </div>
            </div>
        </div>
    );
};

export default VendorList;
