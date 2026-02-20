import React, { useState } from 'react';
import { Search, Filter, CheckSquare, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import ExportActions from '../../../components/common/ExportActions';
import ActionButtons from '../../../components/common/ActionButtons';

const SubAdminList = ({ onEdit, onEditPermissions, onDeactivate, onDelete, onShowToast }) => {
    const [selectedSubAdmins, setSelectedSubAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [fromDate, setFromDate] = useState('');

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
        'Super Admin',
        'Admin',
        'Sub-Admin',
        'Support Agent',
        'Finance User'
    ];

    const filteredSubAdmins = subAdmins.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = !selectedRole || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedSubAdmins(filteredSubAdmins.map(u => u.id));
        } else {
            setSelectedSubAdmins([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedSubAdmins(prev => prev.includes(id) ? prev.filter(uId => uId !== id) : [...prev, id]);
    };

    const handleReset = () => {
        setSearchQuery('');
        setSelectedRole('');
        setFromDate('');
    };

    return (
        <div className="list-wrapper">
            {/* Filter Bar */}
            <div className="v-table-controls">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="v-search">
                        <Search className="search-icon" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="input-with-icon" style={{ width: '180px' }}>
                        <Filter size={15} className="field-icon" />
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="filter-controls">
                    <ExportActions
                        selectedCount={selectedSubAdmins.length}
                        onExport={onShowToast}
                    />
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedSubAdmins.length > 0 && (
                <div className="c-bulk-bar">
                    <span>{selectedSubAdmins.length} sub-admins selected</span>
                    <button onClick={() => setSelectedSubAdmins([])}>Clear Selection</button>
                </div>
            )}

            {/* Table Section */}
            <div className="table-container" style={{ borderTop: 'none', borderRadius: '0' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '48px' }}>
                                <div
                                    onClick={() => handleSelectAll({ target: { checked: selectedSubAdmins.length !== filteredSubAdmins.length } })}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                    {filteredSubAdmins.length > 0 && selectedSubAdmins.length === filteredSubAdmins.length
                                        ? <CheckSquare size={17} color="var(--primary-color)" />
                                        : <Square size={17} color="#94a3b8" />
                                    }
                                </div>
                            </th>
                            <th>Profile</th>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Contact No</th>
                            <th>Emergency No</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th className="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubAdmins.map(user => (
                            <tr key={user.id} style={{ background: selectedSubAdmins.includes(user.id) ? '#f8fafc' : 'white' }}>
                                <td>
                                    <div
                                        onClick={() => handleSelectOne(user.id)}
                                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        {selectedSubAdmins.includes(user.id)
                                            ? <CheckSquare size={17} color="var(--primary-color)" />
                                            : <Square size={17} color="#94a3b8" />
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div className="profile-avatar" style={{ width: '36px', height: '36px', border: '1px solid #e2e8f0' }}>
                                        <img
                                            src={user.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                            alt={user.name}
                                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <span style={{ fontWeight: 600, color: '#111827' }}>{user.name}</span>
                                </td>
                                <td>
                                    <span style={{ color: '#475569', fontSize: '13px' }}>{user.email}</span>
                                </td>
                                <td>
                                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{user.countryCode} {user.mobile}</span>
                                </td>
                                <td>
                                    <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '13px' }}>{user.emergencyMobile}</span>
                                </td>
                                <td>
                                    <span className="status-badge status-approved">{user.role}</span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '13px', color: '#374151' }}>{user.address}</span>
                                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{user.state}, {user.country}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.status === 'Active' ? 'status-live' : 'status-blocked'}`}>
                                        {user.status === 'Active' ? 'ACTIVE' : 'DEACTIVE'}
                                    </span>
                                </td>
                                <td className="col-actions">
                                    <ActionButtons
                                        onEdit={() => onEdit(user)}
                                        onDelete={() => onDelete(user)}
                                        onPermissions={() => onEditPermissions(user)}
                                        onToggleStatus={() => onDeactivate(user)}
                                        isActive={user.status === 'Active'}
                                    />
                                </td>
                            </tr>
                        ))}
                        {filteredSubAdmins.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center p-4" style={{ color: '#94a3b8' }}>
                                    No sub-admins found matching criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            {/* Pagination — updated to c-pagination */}
            <div className="c-pagination" style={{ borderTop: 'none', background: 'white', border: '1px solid var(--border-color)', borderRadius: '0 0 16px 16px' }}>
                <span className="c-pagination-info">
                    Showing {filteredSubAdmins.length} of {subAdmins.length} entries
                </span>
                <div className="c-pagination-btns">
                    <button className="c-page-btn" disabled>
                        <ChevronLeft size={16} /> Prev
                    </button>
                    <button className="c-page-btn">
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubAdminList;
