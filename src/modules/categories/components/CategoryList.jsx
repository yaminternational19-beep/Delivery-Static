import React, { useState } from 'react';
import {
    Search, Filter, ChevronLeft, ChevronRight,
    CheckSquare, Square
} from 'lucide-react';
import ActionButtons from '../../../components/common/ActionButtons';
import ExportActions from '../../../components/common/ExportActions';

const CategoryList = ({ onEdit, onDelete, showToast }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const categories = [
        { id: 'CAT001', name: 'Spices & Herbs', description: 'Dried spices, herbs, and seasonings', products: 145, status: 'Active', icon: '🌶️' },
        { id: 'CAT002', name: 'Vegetables', description: 'Fresh organic vegetables', products: 89, status: 'Active', icon: '🥦' },
        { id: 'CAT003', name: 'Fruits', description: 'Seasonal and exotic fruits', products: 64, status: 'Active', icon: '🍎' },
        { id: 'CAT004', name: 'Dairy & Eggs', description: 'Milk, cheese, yogurt, and eggs', products: 42, status: 'Inactive', icon: '🥛' },
        { id: 'CAT005', name: 'Bakery', description: 'Bread, pastries, and cakes', products: 38, status: 'Active', icon: '🍞' },
    ];

    const toggleSelectAll = () => {
        if (selectedRows.length === paginatedCategories.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedCategories.map(c => c.id));
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    const handleToggleStatus = (category) => {
        const next = category.status === 'Active' ? 'Deactivated' : 'Activated';
        showToast(`${next} "${category.name}"`, 'success');
    };

    const filteredCategories = categories.filter(c => {
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        const matchesSearch =
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="c-table-container">

            {/* ── Controls Bar ── */}
            <div className="c-table-controls">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

                    {/* Search */}
                    <div className="c-search">
                        <Search className="search-icon" size={16} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="input-with-icon" style={{ width: '160px' }}>
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
                        {selectedRows.length} {selectedRows.length === 1 ? 'category' : 'categories'} selected
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
                                {selectedRows.length === paginatedCategories.length && paginatedCategories.length > 0
                                    ? <CheckSquare size={17} color="var(--primary-color)" />
                                    : <Square size={17} color="#94a3b8" />
                                }
                            </div>
                        </th>
                        <th style={{ width: '60px' }}>Icon</th>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCategories.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                                No categories found.
                            </td>
                        </tr>
                    ) : (
                        paginatedCategories.map((category) => (
                            <tr
                                key={category.id}
                                className={selectedRows.includes(category.id) ? 'selected-row' : ''}
                            >
                                {/* Checkbox */}
                                <td>
                                    <div
                                        onClick={() => toggleSelectRow(category.id)}
                                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        {selectedRows.includes(category.id)
                                            ? <CheckSquare size={17} color="var(--primary-color)" />
                                            : <Square size={17} color="#94a3b8" />
                                        }
                                    </div>
                                </td>

                                {/* Icon */}
                                <td>
                                    <div className="category-icon-box">{category.icon}</div>
                                </td>

                                {/* Category ID */}
                                <td>
                                    <span className="cat-id-badge">{category.id}</span>
                                </td>

                                {/* Name */}
                                <td>
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {category.name}
                                    </span>
                                </td>

                                {/* Description */}
                                <td style={{ maxWidth: '240px', color: '#64748b', fontSize: '0.88rem' }}>
                                    {category.description}
                                </td>

                                {/* Status */}
                                <td>
                                    <span className={`badge ${category.status === 'Active' ? 'success' : 'error'}`}>
                                        {category.status}
                                    </span>
                                </td>

                                {/* Actions — shared ActionButtons component */}
                                <td>
                                    <ActionButtons
                                        onEdit={() => onEdit?.(category)}
                                        onToggleStatus={() => handleToggleStatus(category)}
                                        onDelete={() => onDelete?.(category)}
                                        isActive={category.status === 'Active'}
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
                    {filteredCategories.length === 0
                        ? 0
                        : (currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, filteredCategories.length)}{' '}
                    of {filteredCategories.length} categories
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

export default CategoryList;
