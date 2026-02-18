import React, { useState } from 'react';
import { Search, FileText, FileDown, Edit2, Shield, Slash, Trash2, CheckSquare, Square, User, Smartphone, MapPin, ShieldAlert, Mail } from 'lucide-react';
import ActionButton from '../../../components/common/ActionButton/ActionButton';

const SubAdminList = ({ onEdit, onEditPermissions, onDeactivate, onDelete, onShowToast }) => {
    const [selectedSubAdmins, setSelectedSubAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('All Roles');

    const subAdmins = [
        {
            id: 1,
            name: 'Admin One',
            email: 'admin1@platform.com',
            mobile: '1234567890',
            countryCode: '+1',
            emergencyMobile: '9876543210',
            address: 'Suite 405, 5th Ave',
            state: 'New York',
            country: 'USA',
            status: 'Active',
            role: 'Super Admin',
            photo: null
        },
        {
            id: 2,
            name: 'Support Jane',
            email: 'jane@platform.com',
            mobile: '0987654321',
            countryCode: '+44',
            emergencyMobile: '1122334455',
            address: '12 Baker Street',
            state: 'London',
            country: 'UK',
            status: 'Active',
            role: 'Support Agent',
            photo: null
        },
        {
            id: 3,
            name: 'Finance Mike',
            email: 'mike@platform.com',
            mobile: '1122334455',
            countryCode: '+91',
            emergencyMobile: '5544332211',
            address: 'B4 Sector 62',
            state: 'Karnataka',
            country: 'India',
            status: 'Inactive',
            role: 'Finance User',
            photo: null
        },
    ];

    const roles = [
        { title: 'All Roles', description: 'Show all users' },
        { title: 'Super Admin', description: 'Full access' },
        { title: 'Admin', description: 'Custom permission sets' },
        { title: 'Sub-Admin', description: 'Restricted access' },
        { title: 'Support Agent', description: 'View-only for tickets and refunds' },
        { title: 'Finance User', description: 'View and export payouts/invoices' }
    ];

    const filteredSubAdmins = subAdmins.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === 'All Roles' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const handleSelectAll = () => {
        setSelectedSubAdmins(selectedSubAdmins.length === filteredSubAdmins.length ? [] : filteredSubAdmins.map(u => u.id));
    };

    const handleSelectOne = (id) => {
        setSelectedSubAdmins(prev => prev.includes(id) ? prev.filter(uId => uId !== id) : [...prev, id]);
    };

    const handleExport = (format) => {
        if (selectedSubAdmins.length === 0) {
            onShowToast('Please select at least one user to export.', 'error');
            return;
        }

        const dataToExport = filteredSubAdmins.filter(u => selectedSubAdmins.includes(u.id));
        onShowToast(`Exporting ${dataToExport.length} users to ${format}...`, 'success');
    };

    return (
        <div className="card">
            <div className="table-header" style={{ padding: '12px 20px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div className="search-bar" style={{ width: '280px' }}>
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="filter-select"
                        style={{ minWidth: '180px' }}
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        {roles.map(role => (
                            <option key={role.title} value={role.title}>
                                {role.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="action-group" style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className="action-btn secondary sm"
                        onClick={() => handleExport('Excel')}
                        style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #10b981' }}
                    >
                        <FileDown size={16} /> Excel
                    </button>
                    <button
                        className="action-btn secondary sm"
                        onClick={() => handleExport('PDF')}
                        style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #f87171' }}
                    >
                        <FileText size={16} /> PDF
                    </button>
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>
                            <button className="icon-btn-plain" onClick={handleSelectAll}>
                                {filteredSubAdmins.length > 0 && selectedSubAdmins.length === filteredSubAdmins.length ?
                                    <CheckSquare size={20} color="var(--primary-color)" /> : <Square size={20} />}
                            </button>
                        </th>
                        <th>Profile</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Contact No</th>
                        <th>Emergency No</th>
                        <th>Full Address</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubAdmins.map(user => (
                        <tr key={user.id} className={selectedSubAdmins.includes(user.id) ? 'row-selected' : ''}>
                            <td>
                                <button className="icon-btn-plain" onClick={() => handleSelectOne(user.id)}>
                                    {selectedSubAdmins.includes(user.id) ? <CheckSquare size={20} color="var(--primary-color)" /> : <Square size={20} />}
                                </button>
                            </td>
                            <td>
                                <div className="user-avatar-sm">
                                    {user.photo ? <img src={user.photo} alt={user.name} /> : <User size={18} />}
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong className="text-primary">{user.name}</strong>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.role}</span>
                                </div>
                            </td>
                            <td>
                                <div className="contact-cell">
                                    <Mail size={14} className="text-secondary" />
                                    <span>{user.email}</span>
                                </div>
                            </td>
                            <td>
                                <div className="contact-cell">
                                    <Smartphone size={14} className="text-secondary" />
                                    <span>{user.countryCode} {user.mobile}</span>
                                </div>
                            </td>
                            <td>
                                <div className="contact-cell">
                                    <ShieldAlert size={14} color="var(--error)" />
                                    <span style={{ fontWeight: 500 }}>{user.emergencyMobile}</span>
                                </div>
                            </td>
                            <td>
                                <div className="address-cell">
                                    <p className="text-primary" style={{ fontSize: '0.85rem' }}>{user.address}</p>
                                    <p className="text-secondary" style={{ fontSize: '0.75rem' }}>{user.state}, {user.country}</p>
                                </div>
                            </td>
                            <td>
                                <span className={`status-pill ${user.status.toLowerCase()}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td style={{ textAlign: 'right', paddingRight: '12px' }}>
                                <div className="action-group-modern">
                                    <ActionButton
                                        variant="edit"
                                        icon={Edit2}
                                        tooltip="Edit Details"
                                        onClick={() => onEdit(user)}
                                    />
                                    <ActionButton
                                        variant="perm"
                                        icon={Shield}
                                        tooltip="Permissions"
                                        onClick={() => onEditPermissions(user)}
                                    />
                                    <ActionButton
                                        variant="status"
                                        icon={Slash}
                                        tooltip="Deactivate"
                                        onClick={() => onDeactivate(user)}
                                    />
                                    <ActionButton
                                        variant="delete"
                                        icon={Trash2}
                                        tooltip="Remove Sub-Admin"
                                        onClick={() => onDelete(user)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredSubAdmins.length === 0 && (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                                No sub-admins found matching "{searchQuery}"
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SubAdminList;
