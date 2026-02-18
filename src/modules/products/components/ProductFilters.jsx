import React from 'react';
import { Search, Filter, Calendar, X } from 'lucide-react';

const ProductFilters = ({ filters, setFilters, onClear }) => {

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
                    placeholder="Search product, brand, vendor..."
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
                    <option value="TechSolution">TechSolution Ltd</option>
                    <option value="FashionHub">FashionHub Inc</option>
                    <option value="GroceryMart">GroceryMart</option>
                    <option value="HomeStyle">HomeStyle Co</option>
                </select>


                <select
                    className="filter-select"
                    value={filters.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Home & Auto">Home & Auto</option>
                </select>

                <select
                    className="filter-select"
                    value={filters.subCategory}
                    onChange={(e) => handleChange('subCategory', e.target.value)}
                >
                    <option value="">All Sub Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Kitchen">Kitchen</option>
                </select>



                <select
                    className="filter-select"
                    value={filters.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                >
                    <option value="">All Brands</option>
                    <option value="Sony">Sony</option>
                    <option value="Organic India">Organic India</option>
                    <option value="Noise">Noise</option>
                    <option value="Samsung">Samsung</option>
                </select>

                <select
                    className="filter-select"
                    value={filters.isApproved}
                    onChange={(e) => handleChange('isApproved', e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="true">Approved</option>
                    <option value="false">Pending</option>
                    <option value="rejected">Rejected</option>
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
                {(filters.search || filters.category || filters.vendor || filters.brand || filters.isApproved || filters.fromDate || filters.toDate) && (
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

export default ProductFilters;
