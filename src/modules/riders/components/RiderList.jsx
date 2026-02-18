import React from 'react';
import { Search, Eye, ShieldCheck, MapPin, Download, FileText, UserX, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const RiderList = ({
    riders,
    totalCount,
    filters,
    setFilters,
    pagination,
    setPagination,
    locationData,
    selectedRiderIds,
    setSelectedRiderIds,
    onVerify,
    onView,
    onTerminate,
    onActivate,
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
            kycStatus: 'All',
            country: 'All',
            state: 'All',
            city: 'All'
        });
        showToast('Filters cleared', 'info');
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRiderIds(riders.map(r => r.id));
        } else {
            setSelectedRiderIds([]);
        }
    };

    const handleSelectOne = (id) => {
        if (selectedRiderIds.includes(id)) {
            setSelectedRiderIds(selectedRiderIds.filter(item => item !== id));
        } else {
            setSelectedRiderIds([...selectedRiderIds, id]);
        }
    };

    const handleActionGuard = (rider, action) => {
        if (rider.riderStatus === 'Terminated') {
            showToast(`Please activate the terminated rider first to perform this action.`, 'error');
            return false;
        }
        action();
        return true;
    };

    const countries = Object.keys(locationData);
    const states = filters.country !== 'All' ? Object.keys(locationData[filters.country]) : [];
    const cities = (filters.country !== 'All' && filters.state !== 'All') ? locationData[filters.country][filters.state] : [];

    return (
        <div className="rider-table-container">
            <div className="rider-table-controls" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                        <div className="rider-search" style={{ width: '250px' }}>
                            <Search className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Search riders..."
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
                            value={filters.kycStatus}
                            onChange={(e) => handleFilterChange('kycStatus', e.target.value)}
                        >
                            <option value="All">All KYC Status</option>
                            <option value="Verified">Verified</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                        <button
                            className="action-btn secondary sm"
                            onClick={resetFilters}
                            style={{
                                height: '42px',
                                padding: '0 16px',
                                background: '#f1f5f9',
                                border: '1px solid #e2e8f0',
                                color: '#64748b'
                            }}
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
                                    checked={selectedRiderIds.length === riders.length && riders.length > 0}
                                />
                            </th>
                            <th>PROFILE</th>
                            <th>RIDER ID</th>
                            <th>RIDER NAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>CITY</th>
                            <th>VEHICLE TYPE</th>
                            <th>VEHICLE NUMBER</th>
                            <th>JOINED DATE</th>
                            <th>RIDER STATUS</th>
                            <th>KYC STATUS</th>
                            <th style={{ textAlign: 'center' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr key={rider.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRiderIds.includes(rider.id)}
                                        onChange={() => handleSelectOne(rider.id)}
                                    />
                                </td>
                                <td>
                                    <div className="profile-initials">
                                        {rider.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </td>
                                <td style={{ fontWeight: 600, color: '#64748b', fontSize: '0.85rem' }}>{rider.id}</td>
                                <td style={{ fontWeight: 600, color: '#1e293b' }}>{rider.name}</td>
                                <td style={{ fontSize: '0.85rem', color: '#475569' }}>{rider.phone}</td>
                                <td style={{ fontSize: '0.85rem', color: '#475569' }}>{rider.email}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#475569' }}>
                                        <MapPin size={12} color="#94a3b8" />
                                        {rider.city}
                                    </div>
                                </td>
                                <td style={{ fontSize: '0.85rem', color: '#475569' }}>{rider.vehicle}</td>
                                <td style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>{rider.vehicleNumber}</td>
                                <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{rider.joinedDate}</td>
                                <td>
                                    <span className={`badge ${rider.riderStatus === 'Active' ? 'success' : 'error'}`} style={{ fontSize: '0.7rem' }}>
                                        {rider.riderStatus}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span className={`status-wait ${rider.kycStatus === 'Verified' ? 'status-verified' :
                                            rider.kycStatus === 'Rejected' ? 'status-rejected' : ''
                                            }`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                            {rider.kycStatus === 'Pending' ? 'Wait - Pending' : rider.kycStatus}
                                        </span>
                                        {rider.kycStatus === 'Rejected' && rider.kycReason && (
                                            <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 500 }}>
                                                Reason: {rider.kycReason}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="action-btns" style={{ justifyContent: 'center', gap: '8px' }}>
                                        <button
                                            className="icon-btn"
                                            onClick={() => onView(rider)}
                                            title="View Profile"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className="icon-btn"
                                            onClick={() => handleActionGuard(rider, () => onVerify(rider))}
                                            title="KYC Verify"
                                            style={{
                                                color: rider.riderStatus !== 'Terminated' ? 'var(--primary-color)' : '#94a3b8',
                                                background: rider.riderStatus !== 'Terminated' ? '#eef2ff' : '#f1f5f9'
                                            }}
                                        >
                                            <ShieldCheck size={16} />
                                        </button>

                                        {rider.riderStatus === 'Terminated' ? (
                                            <button
                                                className="icon-btn"
                                                onClick={() => onActivate(rider.id)}
                                                title="Activate Rider"
                                                style={{ color: '#10b981', background: '#ecfdf5' }}
                                            >
                                                <RefreshCcw size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                className="icon-btn"
                                                onClick={() => onTerminate(rider.id)}
                                                title="Terminate"
                                                style={{ color: '#ef4444', background: '#fef2f2' }}
                                            >
                                                <UserX size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div style={{
                padding: '20px 24px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff'
            }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Showing <strong>{Math.min(itemsPerPage * (currentPage - 1) + 1, totalCount)}</strong> to <strong>{Math.min(itemsPerPage * currentPage, totalCount)}</strong> of <strong>{totalCount}</strong> riders
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                        className="icon-btn"
                        disabled={currentPage === 1}
                        onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                        style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                border: '1px solid',
                                borderColor: currentPage === i + 1 ? 'var(--primary-color)' : '#e2e8f0',
                                background: currentPage === i + 1 ? 'var(--primary-color)' : 'transparent',
                                color: currentPage === i + 1 ? '#fff' : '#64748b',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="icon-btn"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                        style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RiderList;
