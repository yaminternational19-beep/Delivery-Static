import React from 'react';
import { Search, Eye, Edit2, Ban, UserX, FileText, Download, MapPin, ChevronLeft, ChevronRight, RefreshCcw, CheckCircle } from 'lucide-react';

const CustomerList = ({
    customers,
    totalCount,
    filters,
    setFilters,
    pagination,
    setPagination,
    locationData,
    selectedCustomerIds,
    setSelectedCustomerIds,
    onView,
    onEdit,
    onBlock,
    onActivate,
    onTerminate,
    showToast
}) => {
    const { currentPage, itemsPerPage } = pagination;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };

        // Interrelated logic
        if (key === 'country') {
            newFilters.state = 'All';
            newFilters.city = 'All';
        } else if (key === 'state') {
            newFilters.city = 'All';
        }

        setFilters(newFilters);
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            status: 'All',
            country: 'All',
            state: 'All',
            city: 'All'
        });
        showToast('Filters cleared', 'info');
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedCustomerIds(customers.map(c => c.id));
        } else {
            setSelectedCustomerIds([]);
        }
    };

    const handleSelectOne = (id) => {
        if (selectedCustomerIds.includes(id)) {
            setSelectedCustomerIds(selectedCustomerIds.filter(item => item !== id));
        } else {
            setSelectedCustomerIds([...selectedCustomerIds, id]);
        }
    };

    const countries = Object.keys(locationData);
    const states = filters.country !== 'All' ? Object.keys(locationData[filters.country]) : [];
    const cities = (filters.country !== 'All' && filters.state !== 'All') ? locationData[filters.country][filters.state] : [];

    return (
        <div className="customer-table-container">
            <div className="customer-table-controls">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', width: '100%' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                        <div className="customer-search">
                            <Search className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>

                        <select
                            className="filter-select"
                            value={filters.country}
                            onChange={(e) => handleFilterChange('country', e.target.value)}
                        >
                            <option value="All">All Countries</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <select
                            className="filter-select"
                            disabled={filters.country === 'All'}
                            value={filters.state}
                            onChange={(e) => handleFilterChange('state', e.target.value)}
                        >
                            <option value="All">All States</option>
                            {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>

                        <select
                            className="filter-select"
                            disabled={filters.state === 'All'}
                            value={filters.city}
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                        >
                            <option value="All">All Cities</option>
                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <select
                            className="filter-select"
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Terminated">Terminated</option>
                        </select>

                        <button
                            className="action-btn secondary sm"
                            onClick={resetFilters}
                            style={{ height: '42px', padding: '0 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b' }}
                        >
                            Clear
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="action-btn secondary sm" onClick={() => showToast('Exporting to PDF...', 'info')}>
                            <FileText size={16} /> Export PDF
                        </button>
                        <button className="action-btn secondary sm" onClick={() => showToast('Exporting to Excel...', 'info')}>
                            <Download size={16} /> Export Excel
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40px' }}>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedCustomerIds.length === customers.length && customers.length > 0}
                                />
                            </th>
                            <th>PROFILE</th>
                            <th>CUSTOMER ID</th>
                            <th>NAME</th>
                            <th>CONTACT</th>
                            <th>CITY</th>
                            <th>TOTAL ORDERS</th>
                            <th>JOINED ON</th>
                            <th>STATUS</th>
                            <th style={{ textAlign: 'center' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomerIds.includes(customer.id)}
                                        onChange={() => handleSelectOne(customer.id)}
                                    />
                                </td>
                                <td>
                                    <div className="profile-initials">
                                        {customer.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </td>
                                <td style={{ fontWeight: 600, color: '#64748b', fontSize: '0.85rem' }}>{customer.id}</td>
                                <td style={{ fontWeight: 600, color: '#1e293b' }}>{customer.name}</td>
                                <td style={{ fontSize: '0.85rem', color: '#475569' }}>
                                    <div>{customer.email}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{customer.phone}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#475569' }}>
                                        <MapPin size={12} color="#94a3b8" />
                                        {customer.city}
                                    </div>
                                </td>
                                <td style={{ textAlign: 'center', fontWeight: 600 }}>{customer.totalOrders}</td>
                                <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{customer.joined}</td>
                                <td>
                                    <span className={`badge ${customer.status === 'Active' ? 'success' : customer.status === 'Terminated' ? 'error' : 'warning'}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-btns" style={{ justifyContent: 'center', gap: '8px' }}>
                                        <button className="icon-btn" onClick={() => onView(customer)} title="View Profile">
                                            <Eye size={16} />
                                        </button>
                                        <button className="icon-btn" onClick={() => onEdit(customer)} title="Edit Details">
                                            <Edit2 size={16} />
                                        </button>

                                        {customer.status === 'Terminated' ? (
                                            <button className="icon-btn" onClick={() => onActivate(customer.id)} title="Activate Account" style={{ color: '#10b981', background: '#ecfdf5' }}>
                                                <RefreshCcw size={16} />
                                            </button>
                                        ) : (
                                            <>
                                                {customer.status === 'Blocked' ? (
                                                    <button className="icon-btn" onClick={() => onActivate(customer.id)} title="Unblock User" style={{ color: '#f59e0b', background: '#fff7ed' }}>
                                                        <CheckCircle size={16} />
                                                    </button>
                                                ) : (
                                                    <button className="icon-btn" onClick={() => onBlock(customer.id)} title="Block User" style={{ color: '#f59e0b', background: '#fff7ed' }}>
                                                        <Ban size={16} />
                                                    </button>
                                                )}
                                                <button className="icon-btn" onClick={() => onTerminate(customer.id)} title="Terminate Account" style={{ color: '#ef4444', background: '#fef2f2' }}>
                                                    <UserX size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Showing <strong>{Math.min(itemsPerPage * (currentPage - 1) + 1, totalCount)}</strong> to <strong>{Math.min(itemsPerPage * currentPage, totalCount)}</strong> of <strong>{totalCount}</strong> customers
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="icon-btn" disabled={currentPage === 1} onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))} style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        <ChevronLeft size={18} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i + 1} onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid', borderColor: currentPage === i + 1 ? 'var(--primary-color)' : '#e2e8f0', background: currentPage === i + 1 ? 'var(--primary-color)' : 'transparent', color: currentPage === i + 1 ? '#fff' : '#64748b', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                            {i + 1}
                        </button>
                    ))}
                    <button className="icon-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))} style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
