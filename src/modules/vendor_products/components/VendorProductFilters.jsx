import React from 'react';
import { Search, X } from 'lucide-react';

const VendorProductFilters = ({ filters, setFilters, onClear }) => {

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="product-filters-container">

            {/* Search */}
            <div className="p-search">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search product or brand..."
                    value={filters.search || ''}
                    onChange={(e) => handleChange('search', e.target.value)}
                />
            </div>

            <div className="filter-group">

                {/* Category */}
                <select
                    className="filter-select"
                    value={filters.category || ''}
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Groceries">Groceries</option>
                </select>

                {/* Sub Category */}
                <select
                    className="filter-select"
                    value={filters.subCategory || ''}
                    onChange={(e) => handleChange('subCategory', e.target.value)}
                >
                    <option value="">All Sub Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Shoes">Shoes</option>
                </select>

                {/* Brand */}
                <select
                    className="filter-select"
                    value={filters.brand || ''}
                    onChange={(e) => handleChange('brand', e.target.value)}
                >
                    <option value="">All Brands</option>
                    <option value="Sony">Sony</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Nike">Nike</option>
                    <option value="Amul">Amul</option>
                </select>

                {/* Stock Filter */}
                <select
                    className="filter-select"
                    value={filters.stock || ''}
                    onChange={(e) => handleChange('stock', e.target.value)}
                >
                    <option value="">All Stock</option>
                    <option value="high">In Stock</option>
                    <option value="low">Low Stock</option>
                    <option value="out">Out of Stock</option>
                </select>

                {/* Status Filter */}
                <select
                    className="filter-select"
                    value={filters.status || ''}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>

                {/* Clear Button */}
                {Object.values(filters).some(Boolean) && (
                    <button
                        onClick={onClear}
                        className="filter-clear-btn"
                        title="Clear Filters"
                    >
                        <X size={18} />
                    </button>
                )}

            </div>
        </div>
    );
};

export default VendorProductFilters;
