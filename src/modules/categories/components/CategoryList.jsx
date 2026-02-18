import React, { useState } from 'react';
import {
    Search, Filter, Edit2, Trash2,
    ToggleLeft, ToggleRight, FileText,
    Download, CheckSquare, Square
} from 'lucide-react';

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
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleExport = (type) => {
        showToast(`Exporting ${selectedRows.length || 'all'} categories as ${type}...`, 'info');
    };

    const filteredCategories = categories.filter(c => {
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <div className="c-table-controls">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div className="c-search">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="input-with-icon" style={{ width: '150px' }}>
                        <Filter size={16} className="field-icon" />
                        <select
                            style={{ paddingLeft: '36px', height: '42px' }}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="action-btn secondary" onClick={() => handleExport('PDF')}>
                        <FileText size={18} /> Export PDF
                    </button>
                    <button className="action-btn secondary" onClick={() => handleExport('Excel')}>
                        <Download size={18} /> Export Excel
                    </button>
                </div>
            </div>

            {selectedRows.length > 0 && (
                <div style={{
                    padding: '12px 20px',
                    background: 'rgba(99, 102, 241, 0.05)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                        {selectedRows.length} categories selected
                    </span>
                    <button
                        style={{ background: 'none', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}
                        onClick={() => setSelectedRows([])}
                    >
                        Clear Selection
                    </button>
                </div>
            )}

            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>
                            <div onClick={toggleSelectAll} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                {selectedRows.length === paginatedCategories.length && paginatedCategories.length > 0 ? (
                                    <CheckSquare size={18} color="var(--primary-color)" />
                                ) : (
                                    <Square size={18} color="#94a3b8" />
                                )}
                            </div>
                        </th>
                        <th style={{ width: '60px' }}>Icon</th>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCategories.map((category) => (
                        <tr key={category.id} className={selectedRows.includes(category.id) ? 'selected-row' : ''}>
                            <td>
                                <div onClick={() => toggleSelectRow(category.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    {selectedRows.includes(category.id) ? (
                                        <CheckSquare size={18} color="var(--primary-color)" />
                                    ) : (
                                        <Square size={18} color="#94a3b8" />
                                    )}
                                </div>
                            </td>
                            <td>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '8px',
                                    background: '#f8fafc', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem', border: '1px solid var(--border-color)'
                                }}>
                                    {category.icon}
                                </div>
                            </td>
                            <td>
                                <span style={{
                                    fontSize: '0.85rem',
                                    color: '#64748b',
                                    fontWeight: 500,
                                    padding: '4px 8px',
                                    background: '#f1f5f9',
                                    borderRadius: '4px'
                                }}>
                                    {category.id}
                                </span>
                            </td>
                            <td>
                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{category.name}</div>
                            </td>
                            <td style={{ maxWidth: '250px', color: '#64748b' }}>{category.description}</td>
                            <td>
                                <span className={`badge ${category.status === 'Active' ? 'success' : 'error'}`}>
                                    {category.status}
                                </span>
                            </td>
                            <td>
                                <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                                    <button
                                        className="icon-btn"
                                        onClick={() => onEdit?.(category)}
                                        title="Edit Category"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        className="icon-btn"
                                        onClick={() => showToast(`${category.status === 'Active' ? 'Deactivated' : 'Activated'} ${category.name}`, 'success')}
                                        title={category.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        style={{ color: category.status === 'Active' ? '#f59e0b' : '#10b981' }}
                                    >
                                        {category.status === 'Active' ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                                    </button>
                                    <button
                                        className="icon-btn"
                                        onClick={() => onDelete?.(category)}
                                        title="Delete"
                                        style={{ color: '#ef4444' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCategories.length)} - {Math.min(currentPage * itemsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className="mini-btn secondary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="mini-btn secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CategoryList;

