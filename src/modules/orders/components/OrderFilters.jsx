import React from 'react';
import { Search, Filter, Calendar, X } from 'lucide-react';

const OrderFilters = ({ filters, setFilters, onClear }) => {

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="order-filters-container">
            {/* Search */}
            <div className="o-search">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search by rider, item, brand, or vendor..."
                    value={filters.search}
                    onChange={(e) => handleChange('search', e.target.value)}
                />
            </div>

            {/* Filters Group */}
            <div className="filter-group">

                <select
                    className="filter-select"
                    value={filters.vendor}
                    onChange={(e) => handleChange('vendor', e.target.value)}
                >
                    <option value="">All Vendors</option>
                    <option value="Tech Mart">Tech Mart</option>
                    <option value="Fashion Ave">Fashion Ave</option>
                    <option value="Global Electronics">Global Electronics</option>
                </select>


                <select
                    className="filter-select"
                    value={filters.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Accessories">Accessories</option>
                </select>

                <select
                    className="filter-select"
                    value={filters.subCategory}
                    onChange={(e) => handleChange('subCategory', e.target.value)}
                >
                    <option value="">All Sub Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Footwear">Footwear</option>
                </select>

                <select
                    className="filter-select"
                    value={filters.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                >
                    <option value="">All Brands</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Nike">Nike</option>
                    <option value="Sony">Sony</option>
                    <option value="Apple">Apple</option>
                </select>

                <select
                    className="filter-select"
                    value={filters.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="delivered">Delivered</option>
                    <option value="on-the-way">On the Way</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                {/* Date Range */}
                <div className="date-inputs">
                    <Calendar size={14} className="text-gray-400" />
                    <input
                        type="date"
                        value={filters.fromDate}
                        onChange={(e) => handleChange('fromDate', e.target.value)}
                        placeholder="From"
                    />
                    <span style={{ color: '#cbd5e1' }}>-</span>
                    <input
                        type="date"
                        value={filters.toDate}
                        onChange={(e) => handleChange('toDate', e.target.value)}
                        placeholder="To"
                    />
                </div>

                {/* Clear Filters */}
                {(filters.search || filters.category || filters.vendor || filters.brand || filters.status || filters.fromDate || filters.toDate) && (
                    <button
                        onClick={onClear}
                        className="icon-btn"
                        title="Clear Filters"
                        style={{ color: '#ef4444', border: '1px solid #fee2e2', background: '#fef2f2' }}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderFilters;
