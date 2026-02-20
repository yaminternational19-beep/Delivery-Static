import React from 'react';
import { Search, X, Calendar, FileSpreadsheet, FileText } from 'lucide-react';

const VendorOrderFilters = ({ filters, setFilters, onClear, onExport }) => {
    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleExport = (type) => {
        if (onExport) onExport(type);
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

                <select
                    className="filter-select"
                    value={filters.paymentStatus || ''}
                    onChange={(e) => handleChange('paymentStatus', e.target.value)}
                >
                    <option value="">Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
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

                <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', borderLeft: '1px solid #e2e8f0', paddingLeft: '8px' }}>
                    <button
                        onClick={() => onExport('excel')}
                        title="Export Excel"
                        style={{
                            padding: '8px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            background: '#f0fdf4',
                            color: '#16a34a',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <FileSpreadsheet size={18} />
                    </button>
                    <button
                        onClick={() => onExport('pdf')}
                        title="Export PDF"
                        style={{
                            padding: '8px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            background: '#fff1f2',
                            color: '#e11d48',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <FileText size={18} />
                    </button>
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
                            cursor: 'pointer',
                            flexShrink: 0
                        }}
                        title="Clear Filters"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default VendorOrderFilters;
