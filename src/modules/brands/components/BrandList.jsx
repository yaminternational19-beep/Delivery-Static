import React, { useState } from 'react';
import {
    Search, Filter, Edit2, Trash2,
    ToggleLeft, ToggleRight, ListTree,
    FileText, Download, CheckSquare, Square, Layers, Award
} from 'lucide-react';

const BrandList = ({ onEdit, onDelete, showToast }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [subCategoryFilter, setSubCategoryFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const brands = [
        { id: 'BR001', name: 'Apple', catId: 'CAT001', category: 'Electronics', subCategory: 'Mobile Phones', description: 'Premium smartphones and tech accessories', status: 'Active', logo: '🍎' },
        { id: 'BR002', name: 'Samsung', catId: 'CAT001', category: 'Electronics', subCategory: 'Mobile Phones', description: 'Innovative display and mobile technology', status: 'Active', logo: '📱' },
        { id: 'BR003', name: 'Sony', catId: 'CAT001', category: 'Electronics', subCategory: 'Laptops', description: 'Professional audio and visual electronics', status: 'Active', logo: '🎥' },
        { id: 'BR004', name: 'Nike', catId: 'CAT005', category: 'Fashion', subCategory: 'Footwear', description: 'Athletic footwear and sportswear', status: 'Active', logo: '👟' },
        { id: 'BR005', name: 'Adidas', catId: 'CAT005', category: 'Fashion', subCategory: 'Footwear', description: 'Original sports apparel and accessories', status: 'Inactive', logo: '👕' },
    ];

    const categories = [
        { id: 'CAT001', name: 'Electronics' },
        { id: 'CAT002', name: 'Spices & Herbs' },
        { id: 'CAT003', name: 'Vegetables' },
        { id: 'CAT004', name: 'Fruits' },
        { id: 'CAT005', name: 'Fashion' }
    ];

    const getCountByCategory = (catId) => {
        return brands.filter(b => b.catId === catId).length;
    };

    const uniqueSubCategories = Array.from(new Set(brands.map(b => b.subCategory)));

    const toggleSelectAll = () => {
        if (selectedRows.length === paginatedData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map(item => item.id));
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
        showToast(`Exporting ${selectedRows.length || 'all'} items as ${type}...`, 'info');
    };

    const filteredData = brands.filter(b => {
        const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || b.catId === categoryFilter;
        const matchesSubCategory = subCategoryFilter === 'All' || b.subCategory === subCategoryFilter;
        const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesCategory && matchesSubCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="brand-table-container">
            <div className="brand-table-controls">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="brand-search">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search by brand name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="input-with-icon" style={{ width: '180px' }}>
                        <Layers size={16} className="field-icon" />
                        <select
                            style={{ paddingLeft: '36px', height: '42px' }}
                            value={categoryFilter}
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setSubCategoryFilter('All'); // Reset sub-cat when category changes
                            }}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name} ({getCountByCategory(cat.id)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-with-icon" style={{ width: '180px' }}>
                        <ListTree size={16} className="field-icon" />
                        <select
                            style={{ paddingLeft: '36px', height: '42px' }}
                            value={subCategoryFilter}
                            onChange={(e) => setSubCategoryFilter(e.target.value)}
                        >
                            <option value="All">All Sub-Categories</option>
                            {uniqueSubCategories
                                .filter(sc => {
                                    if (categoryFilter === 'All') return true;
                                    const catName = categories.find(c => c.id === categoryFilter)?.name;
                                    return brands.some(b => b.subCategory === sc && b.category === catName);
                                })
                                .map(sc => (
                                    <option key={sc} value={sc}>{sc}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="input-with-icon" style={{ width: '140px' }}>
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
                        {selectedRows.length} items selected
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
                                {selectedRows.length === paginatedData.length && paginatedData.length > 0 ? (
                                    <CheckSquare size={18} color="var(--primary-color)" />
                                ) : (
                                    <Square size={18} color="#94a3b8" />
                                )}
                            </div>
                        </th>
                        <th style={{ width: '60px' }}>Logo</th>
                        <th>Brand ID</th>
                        <th>Brand Name</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected-row' : ''}>
                            <td>
                                <div onClick={() => toggleSelectRow(item.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    {selectedRows.includes(item.id) ? (
                                        <CheckSquare size={18} color="var(--primary-color)" />
                                    ) : (
                                        <Square size={18} color="#94a3b8" />
                                    )}
                                </div>
                            </td>
                            <td>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '6px',
                                    background: '#f8fafc', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem', border: '1px solid var(--border-color)'
                                }}>
                                    {item.logo}
                                </div>
                            </td>
                            <td>
                                <span style={{
                                    padding: '2px 6px',
                                    background: '#f1f5f9',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    fontWeight: 700
                                }}>
                                    {item.id}
                                </span>
                            </td>
                            <td>
                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                            </td>
                            <td>
                                <span style={{ fontWeight: 500, color: '#475569', fontSize: '0.9rem' }}>{item.category}</span>
                            </td>
                            <td>
                                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.subCategory}</span>
                            </td>
                            <td>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: '#64748b',
                                    maxWidth: '220px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {item.description}
                                </div>
                            </td>
                            <td>
                                <span className={`badge ${item.status === 'Active' ? 'success' : 'error'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td>
                                <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                                    <button
                                        className="icon-btn"
                                        onClick={() => onEdit?.(item)}
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        className="icon-btn"
                                        onClick={() => showToast(`${item.status === 'Active' ? 'Deactivated' : 'Activated'} ${item.name}`, 'success')}
                                        title={item.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        style={{ color: item.status === 'Active' ? '#f59e0b' : '#10b981' }}
                                    >
                                        {item.status === 'Active' ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                                    </button>
                                    <button
                                        className="icon-btn"
                                        onClick={() => onDelete?.(item)}
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
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} items
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

export default BrandList;
