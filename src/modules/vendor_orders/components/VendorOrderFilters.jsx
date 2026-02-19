
import React from 'react';
import { Search, X, Calendar } from 'lucide-react';

const VendorOrderFilters = ({ filters, setFilters, onClear }) => {
    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="order-filters-container">
            <div className="o-search">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search Order ID, Customer..."
                    value={filters.search || ''}
                    onChange={(e) => handleChange('search', e.target.value)}
                />
            </div>

            <div className="filter-group">
                <select
                    className="filter-select"
                    value={filters.status || ''}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Picked">Picked</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <div className="date-inputs">
                    <Calendar size={16} color="#94a3b8" />
                    <input
                        type="date"
                        value={filters.fromDate || ''}
                        onChange={(e) => handleChange('fromDate', e.target.value)}
                        placeholder="From"
                    />
                    <span style={{ color: '#cbd5e1' }}>-</span>
                    <input
                        type="date"
                        value={filters.toDate || ''}
                        onChange={(e) => handleChange('toDate', e.target.value)}
                        placeholder="To"
                    />
                </div>

                {Object.values(filters).some(Boolean) && (
                    <button
                        onClick={onClear}
                        style={{
                            width: '38px',
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            border: '1px solid #fee2e2',
                            background: '#fef2f2',
                            color: '#ef4444',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default VendorOrderFilters;
