import React, { useState, useMemo } from 'react';
import {
    Search,
    Calendar,
    History,
    FileEdit,
    LogIn,
    ShieldAlert,
    Package,
    ArrowUpRight,
    FileText,
    Download,
    Filter
} from 'lucide-react';

const VendorLogs = ({ showToast }) => {
    // State
    const [filters, setFilters] = useState({
        search: '',
        vendor: '',
        companyName: '',
        actionType: 'All',
        status: 'All',
        fromDate: '',
        toDate: ''
    });
    const [selectedRows, setSelectedRows] = useState([]);

    // Mock Data with Success/Failed status
    const mockLogs = [
        { id: 'LOG-8821', vendorName: 'Organic Harvest Co', companyName: 'Organic Harvest Private Limited', address: '12-B, Green Valley, Dehradun', vendorId: 'V-8821', action: 'Product Added', details: 'Added "Organic Himalayan Green Tea" to inventory', editedBy: 'Amit Kumar', timestamp: '17 Feb 26, 12:45 PM', ip: '192.168.1.45', status: 'Success', icon: <Package size={14} /> },
        { id: 'LOG-8822', vendorName: 'ElectroHub Retail', companyName: 'ElectroHub Digital Solutions', address: 'Plot 45, Tech Park, Bangalore', vendorId: 'V-9902', action: 'Login Attempt', details: 'Successful login from new device (MacBook Pro)', editedBy: 'System Auto', timestamp: '17 Feb 26, 11:30 AM', ip: '103.24.55.12', status: 'Success', icon: <LogIn size={14} /> },
        { id: 'LOG-8823', vendorName: 'Fashion Forward', companyName: 'FF Retail & Lifestyle', address: 'Sector 18, Noida, UP', vendorId: 'V-4412', action: 'KYC Resubmitted', details: 'Updated PAN card document after rejection', editedBy: 'Suresh Raina', timestamp: '17 Feb 26, 10:15 AM', ip: '172.16.0.101', status: 'Success', icon: <FileEdit size={14} /> },
        { id: 'LOG-8824', vendorName: 'TechSolution Ltd', companyName: 'TechSolution Global Services', address: 'Cyber Hub, DLF Phase 3, Gurgaon', vendorId: 'V-1001', action: 'Price Update', details: 'Changed MRP of "Wireless Earbuds" from ₹1200 to ₹1500', editedBy: 'John Doe', timestamp: '16 Feb 26, 05:20 PM', ip: '192.168.1.12', status: 'Success', icon: <ArrowUpRight size={14} /> },
        { id: 'LOG-8825', vendorName: 'GroceryMart', companyName: 'GroceryMart Retail Chain', address: 'MG Road, Pune, Maharashtra', vendorId: 'V-1002', action: 'Unauthorized Access', details: 'Multiple failed password attempts detected', editedBy: 'Security Bot', timestamp: '16 Feb 26, 04:00 PM', ip: '45.12.33.190', status: 'Failed', icon: <ShieldAlert size={14} /> },
        { id: 'LOG-8826', vendorName: 'Organic Harvest Co', companyName: 'Organic Harvest Private Limited', address: '12-B, Green Valley, Dehradun', vendorId: 'V-8821', action: 'Payout Requested', details: 'Requested payout of ₹45,000 to HDFC Bank', editedBy: 'Amit Kumar', timestamp: '16 Feb 26, 02:30 PM', ip: '192.168.1.45', status: 'Success', icon: <History size={14} /> }
    ];

    // Filtering
    const filteredLogs = useMemo(() => {
        return mockLogs.filter(log => {
            const searchMatch = !filters.search ||
                log.vendorName.toLowerCase().includes(filters.search.toLowerCase()) ||
                log.id.toLowerCase().includes(filters.search.toLowerCase());

            const vendorMatch = !filters.vendor || log.vendorName === filters.vendor;
            const companyMatch = !filters.companyName || log.companyName === filters.companyName;
            const statusMatch = filters.status === 'All' || log.status === filters.status;

            const typeMatch = filters.actionType === 'All' ||
                (filters.actionType === 'Product' && log.action.includes('Product')) ||
                (filters.actionType === 'Login' && log.action.includes('Login')) ||
                (filters.actionType === 'KYC' && log.action.includes('KYC')) ||
                (filters.actionType === 'Finance' && log.action.includes('Payout'));

            return searchMatch && vendorMatch && companyMatch && typeMatch && statusMatch;
        });
    }, [filters]);

    // Unique Companies for Filter
    const uniqueCompanies = useMemo(() => [...new Set(mockLogs.map(l => l.companyName))], []);

    // Handlers
    const handleSelectAll = (e) => setSelectedRows(e.target.checked ? filteredLogs.map(l => l.id) : []);
    const handleSelectRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
    const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    const handleExport = (type) => {
        if (selectedRows.length === 0) {
            showToast('Please select at least one log entry to export.', 'warning');
            return;
        }
        showToast(`Exporting ${selectedRows.length} activity logs to ${type}...`, 'success');
        setSelectedRows([]);
    };

    return (
        <div className="v-table-container" style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="v-table-controls">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="v-search">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>

                    <div className="input-with-icon" style={{ width: '180px' }}>
                        <Filter size={16} className="field-icon" />
                        <select
                            value={filters.companyName}
                            onChange={(e) => handleFilterChange('companyName', e.target.value)}
                        >
                            <option value="">All Companies</option>
                            {uniqueCompanies.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="input-with-icon" style={{ width: '160px' }}>
                        <Filter size={16} className="field-icon" />
                        <select
                            value={filters.actionType}
                            onChange={(e) => handleFilterChange('actionType', e.target.value)}
                        >
                            <option value="All">All Actions</option>
                            <option value="Product">Product Updates</option>
                            <option value="Login">Access Logs</option>
                            <option value="KYC">Security / KYC</option>
                            <option value="Finance">Financials</option>
                        </select>
                    </div>

                    <div className="input-with-icon" style={{ width: '140px' }}>
                        <Filter size={16} className="field-icon" />
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Success">Success</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>

                    <div className="date-inputs">
                        <Calendar size={14} className="text-gray-400" />
                        <input type="date" value={filters.fromDate} onChange={(e) => handleFilterChange('fromDate', e.target.value)} />
                        <span style={{ color: '#cbd5e1' }}>-</span>
                        <input type="date" value={filters.toDate} onChange={(e) => handleFilterChange('toDate', e.target.value)} />
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

            <div style={{ overflowX: 'auto' }}>
                <table className="dashboard-table" style={{ minWidth: '1400px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '40px' }}>
                                <input
                                    type="checkbox"
                                    className="checkbox-custom"
                                    checked={selectedRows.length === filteredLogs.length && filteredLogs.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>LOG ID</th>
                            <th>VENDOR NAME</th>
                            <th>COMPANY NAME</th>
                            <th style={{ width: '220px' }}>ADDRESS</th>
                            <th>ACTION TYPE</th>
                            <th>EDITED BY</th>
                            <th>IP ADDRESS</th>
                            <th>TIMESTAMP</th>
                            <th style={{ textAlign: 'right' }}>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((log) => (
                            <tr key={log.id} className={selectedRows.includes(log.id) ? 'selected-row' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="checkbox-custom"
                                        checked={selectedRows.includes(log.id)}
                                        onChange={() => handleSelectRow(log.id)}
                                    />
                                </td>
                                <td><span style={{ fontWeight: 600, color: '#4f46e5' }}>{log.id}</span></td>
                                <td>
                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.vendorName}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>ID: {log.vendorId}</div>
                                </td>
                                <td><div style={{ fontSize: '0.85rem', color: '#475569' }}>{log.companyName}</div></td>
                                <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }} title={log.address}>{log.address}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>
                                        <span style={{ color: 'var(--primary-color)', display: 'flex' }}>{log.icon}</span>
                                        {log.action}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: '#eef2ff',
                                            color: 'var(--primary-color)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.65rem',
                                            fontWeight: 800
                                        }}>
                                            {log.editedBy.charAt(0)}
                                        </div>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>{log.editedBy}</span>
                                    </div>
                                </td>
                                <td><code style={{ fontSize: '0.75rem', color: '#64748b', background: '#f8fafc', padding: '2px 6px', borderRadius: '4px' }}>{log.ip}</code></td>
                                <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.timestamp}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <span className={`status-badge ${log.status.toLowerCase() === 'success' ? 'success' : 'danger'}`}
                                        style={{ fontSize: '0.65rem', padding: '4px 12px' }}>
                                        {log.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Showing {filteredLogs.length} activity records</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="mini-btn secondary" disabled>Previous</button>
                    <button className="mini-btn secondary" disabled>Next</button>
                </div>
            </div>
        </div>
    );
};

export default VendorLogs;
