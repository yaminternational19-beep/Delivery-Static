import React, { useState } from 'react';
import {
    Search, Filter, ListTree,
    CheckSquare, Square, ChevronLeft, ChevronRight, Layers
} from 'lucide-react';
import ActionButtons from '../../../components/common/ActionButtons';
import ExportActions from '../../../components/common/ExportActions';

const SubCategoryList = ({ onEdit, onDelete, showToast }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const subcategories = [
        { id: 'SC001', name: 'Mobile Phones', catId: 'CAT001', category: 'Electronics', innerSubs: 'iPhone, Samsung, Moto', status: 'Active', icon: '📱' },
        { id: 'SC002', name: 'Laptops', catId: 'CAT001', category: 'Electronics', innerSubs: 'MacBook, Dell, HP', status: 'Active', icon: '💻' },
        { id: 'SC003', name: 'Dried Herbs', catId: 'CAT002', category: 'Spices & Herbs', innerSubs: 'Basil, Oregano, Thyme', status: 'Active', icon: '🌿' },
        { id: 'SC004', name: 'Fresh Fruits', catId: 'CAT004', category: 'Fruits', innerSubs: 'Apple, Banana, Mango', status: 'Inactive', icon: '🍓' },
        { id: 'SC005', name: 'Smart Watches', catId: 'CAT001', category: 'Electronics', innerSubs: 'Apple Watch, Galaxy Watch', status: 'Active', icon: '⌚' },
    ];

    const categories = [
        { id: 'CAT001', name: 'Electronics' },
        { id: 'CAT002', name: 'Spices & Herbs' },
        { id: 'CAT003', name: 'Vegetables' },
        { id: 'CAT004', name: 'Fruits' }
    ];

    const getCountByCategory = (catId) =>
        subcategories.filter(sc => sc.catId === catId).length;

    const toggleSelectAll = () => {
        if (selectedRows.length === paginatedData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map(item => item.id));
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    const handleToggleStatus = (item) => {
        const next = item.status === 'Active' ? 'Deactivated' : 'Activated';
        showToast(`${next} "${item.name}"`, 'success');
    };

    const filteredData = subcategories.filter(sc => {
        const matchesStatus = statusFilter === 'All' || sc.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || sc.catId === categoryFilter;
        const matchesSearch =
            sc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sc.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="sc-table-container">

            {/* ── Controls Bar ── */}
            <div className="sc-table-controls">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>

                    {/* Search */}
                    <div className="sc-search">
                        <Search className="search-icon" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="input-with-icon" style={{ width: '190px' }}>
                        <Layers size={15} className="field-icon" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name} ({getCountByCategory(cat.id)})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="input-with-icon" style={{ width: '150px' }}>
                        <Filter size={15} className="field-icon" />
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Export — shared component */}
                <ExportActions
                    selectedCount={selectedRows.length}
                    onExport={showToast}
                />
            </div>

            {/* ── Bulk Selection Bar ── */}
            {selectedRows.length > 0 && (
                <div className="c-bulk-bar">
                    <span>
                        {selectedRows.length} {selectedRows.length === 1 ? 'item' : 'items'} selected
                    </span>
                    <button onClick={() => setSelectedRows([])}>Clear Selection</button>
                </div>
            )}

            {/* ── Table ── */}
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th style={{ width: '48px' }}>
                            <div
                                onClick={toggleSelectAll}
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                {selectedRows.length === paginatedData.length && paginatedData.length > 0
                                    ? <CheckSquare size={17} color="var(--primary-color)" />
                                    : <Square size={17} color="#94a3b8" />
                                }
                            </div>
                        </th>
                        <th style={{ width: '60px' }}>Icon</th>
                        <th>Cat ID</th>
                        <th>Category Name</th>
                        <th>Sub ID</th>
                        <th>Sub Category Name</th>
                        <th>Items / Products</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan={9} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                                No sub-categories found.
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((item) => (
                            <tr
                                key={item.id}
                                className={selectedRows.includes(item.id) ? 'selected-row' : ''}
                            >
                                {/* Checkbox */}
                                <td>
                                    <div
                                        onClick={() => toggleSelectRow(item.id)}
                                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        {selectedRows.includes(item.id)
                                            ? <CheckSquare size={17} color="var(--primary-color)" />
                                            : <Square size={17} color="#94a3b8" />
                                        }
                                    </div>
                                </td>

                                {/* Icon */}
                                <td>
                                    <div className="category-icon-box">{item.icon}</div>
                                </td>

                                {/* Cat ID */}
                                <td>
                                    <span className="cat-id-badge">{item.catId}</span>
                                </td>

                                {/* Category Name */}
                                <td>
                                    <span style={{ fontWeight: 500, color: '#475569', fontSize: '0.9rem' }}>
                                        {item.category}
                                    </span>
                                </td>

                                {/* Sub ID */}
                                <td>
                                    <span className="cat-id-badge">{item.id}</span>
                                </td>

                                {/* Sub Category Name */}
                                <td>
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {item.name}
                                    </span>
                                </td>

                                {/* Items / Products */}
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem' }}>
                                        <ListTree size={14} />
                                        {item.innerSubs}
                                    </div>
                                </td>

                                {/* Status */}
                                <td>
                                    <span className={`badge ${item.status === 'Active' ? 'success' : 'error'}`}>
                                        {item.status}
                                    </span>
                                </td>

                                {/* Actions — shared ActionButtons component */}
                                <td>
                                    <ActionButtons
                                        onEdit={() => onEdit?.(item)}
                                        onToggleStatus={() => handleToggleStatus(item)}
                                        onDelete={() => onDelete?.(item)}
                                        isActive={item.status === 'Active'}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* ── Pagination ── */}
            <div className="c-pagination">
                <span className="c-pagination-info">
                    Showing{' '}
                    {filteredData.length === 0
                        ? 0
                        : (currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}{' '}
                    of {filteredData.length} items
                </span>
                <div className="c-pagination-btns">
                    <button
                        className="c-page-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        <ChevronLeft size={14} /> Prev
                    </button>
                    <button
                        className="c-page-btn"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next <ChevronRight size={14} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SubCategoryList;
