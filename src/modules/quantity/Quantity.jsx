import React, { useState, useMemo } from 'react';
import {
    Plus, Search, Download, Edit, Trash2,
    Scale, FileText, ToggleLeft, ToggleRight,
    CheckSquare, Square, Layers, Filter
} from 'lucide-react';
import QuantityForm from './components/QuantityForm';
import Toast from '../../components/common/Toast/Toast';
import './quantity.css';

const INITIAL_DATA = [
    { id: 1, category: 'Vegetables', subCategory: 'Leafy Greens', name: 'Kilogram', shortCode: 'kg', status: 'Active', createdAt: '2024-03-01' },
    { id: 2, category: 'Spices & Herbs', subCategory: 'Powder Spices', name: 'Gram', shortCode: 'g', status: 'Active', createdAt: '2024-03-01' },
    { id: 3, category: 'Dairy & Eggs', subCategory: 'Milk', name: 'Liter', shortCode: 'l', status: 'Active', createdAt: '2024-03-02' },
    { id: 4, category: 'Dairy & Eggs', subCategory: 'Milk', name: 'Milliliter', shortCode: 'ml', status: 'Active', createdAt: '2024-03-02' },
    { id: 5, category: 'Bakery', subCategory: 'Bread', name: 'Piece', shortCode: 'pc', status: 'Active', createdAt: '2024-03-03' },
    { id: 6, category: 'Electronics', subCategory: 'Accessories', name: 'Box', shortCode: 'box', status: 'Inactive', createdAt: '2024-03-04' },
    { id: 7, category: 'Spices & Herbs', subCategory: 'Dried Herbs', name: 'Packet', shortCode: 'pkt', status: 'Active', createdAt: '2024-03-05' },
];

const CATEGORIES = [
    'Electronics', 'Spices & Herbs', 'Vegetables', 'Fruits', 'Dairy & Eggs', 'Bakery'
];

const Quantity = () => {
    const [units, setUnits] = useState(INITIAL_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [editingUnit, setEditingUnit] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const filteredUnits = useMemo(() => {
        return units.filter(u => {
            const matchesSearch =
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = categoryFilter === 'All' || u.category === categoryFilter;
            const matchesStatus = statusFilter === 'All' || u.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [units, searchTerm, categoryFilter, statusFilter]);

    const paginatedUnits = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredUnits.slice(start, start + itemsPerPage);
    }, [filteredUnits, currentPage]);

    const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);

    const handleSave = (data) => {
        if (editingUnit) {
            setUnits(units.map(u => u.id === editingUnit.id ? { ...u, ...data } : u));
            showToast('Unit updated successfully!');
        } else {
            const newUnit = {
                ...data,
                id: Date.now(),
                createdAt: new Date().toISOString().split('T')[0]
            };
            setUnits([newUnit, ...units]);
            showToast('New unit added successfully!');
        }
        setShowForm(false);
        setEditingUnit(null);
    };

    const handleDelete = (id) => {
        setUnits(units.filter(u => u.id !== id));
        showToast('Unit deleted successfully!');
    };

    const toggleStatus = (unit) => {
        const newStatus = unit.status === 'Active' ? 'Inactive' : 'Active';
        setUnits(units.map(u => u.id === unit.id ? { ...u, status: newStatus } : u));
        showToast(`${unit.name} is now ${newStatus}`);
    };

    const toggleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === paginatedUnits.length && paginatedUnits.length > 0) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedUnits.map(u => u.id));
        }
    };

    const handleExport = (format) => {
        showToast(`Exporting units as ${format}...`, 'info');
    };

    return (
        <div className="quantity-module">
            <header className="quantity-header">
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Scale size={32} color="var(--primary-color)" />
                        Quantity Management
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                        Define and manage measurement units for categories
                    </p>
                </div>
                <button className="action-btn primary" onClick={() => { setEditingUnit(null); setShowForm(true); }}>
                    <Plus size={18} /> Add New Unit
                </button>
            </header>

            <div className="quantity-table-container">
                <div className="quantity-table-controls">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div className="q-search">
                            <Search className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Search units..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            />
                        </div>

                        <div className="input-with-icon" style={{ width: '180px' }}>
                            <Layers size={16} className="field-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <select
                                style={{ paddingLeft: '36px', height: '42px', width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                value={categoryFilter}
                                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="All">All Categories</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-with-icon" style={{ width: '140px' }}>
                            <Filter size={16} className="field-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <select
                                style={{ paddingLeft: '36px', height: '42px', width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                value={statusFilter}
                                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
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

                <div style={{ overflowX: 'auto' }}>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>
                                    <div onClick={toggleSelectAll} style={{ cursor: 'pointer', display: 'flex' }}>
                                        {selectedRows.length === paginatedUnits.length && paginatedUnits.length > 0 ? (
                                            <CheckSquare size={18} color="var(--primary-color)" />
                                        ) : (
                                            <Square size={18} color="#94a3b8" />
                                        )}
                                    </div>
                                </th>
                                <th>CATEGORY</th>
                                <th>SUB CATEGORY</th>
                                <th>UNIT NAME</th>
                                <th>UNIT CODE</th>
                                <th>STATUS</th>
                                <th>CREATED DATE</th>
                                <th style={{ textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUnits.map(unit => (
                                <tr key={unit.id} className={selectedRows.includes(unit.id) ? 'selected-row' : ''}>
                                    <td>
                                        <div onClick={() => toggleSelectRow(unit.id)} style={{ cursor: 'pointer', display: 'flex' }}>
                                            {selectedRows.includes(unit.id) ? (
                                                <CheckSquare size={18} color="var(--primary-color)" />
                                            ) : (
                                                <Square size={18} color="#94a3b8" />
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: '#475569' }}>{unit.category}</span>
                                    </td>
                                    <td>
                                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{unit.subCategory}</span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{unit.name}</div>
                                    </td>
                                    <td>
                                        <span className="badge-code" style={{ padding: '4px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                                            {unit.shortCode}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${unit.status === 'Active' ? 'approved' : 'rejected'}`}>
                                            {unit.status}
                                        </span>
                                    </td>
                                    <td>{unit.createdAt}</td>
                                    <td>
                                        <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                                            <button
                                                className="icon-btn"
                                                onClick={() => { setEditingUnit(unit); setShowForm(true); }}
                                                title="Edit"
                                            >
                                                <Edit size={18} color="var(--primary-color)" />
                                            </button>
                                            <button
                                                className="icon-btn"
                                                onClick={() => toggleStatus(unit)}
                                                title={unit.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                style={{ color: unit.status === 'Active' ? '#f59e0b' : '#10b981' }}
                                            >
                                                {unit.status === 'Active' ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                            </button>
                                            <button
                                                className="icon-btn"
                                                onClick={() => handleDelete(unit.id)}
                                                title="Delete"
                                                style={{ color: 'var(--error)' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedUnits.length === 0 && (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                                        No measurement units found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination-controls">
                    <span className="pagination-text">
                        Showing {paginatedUnits.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredUnits.length)} of {filteredUnits.length} units
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="action-btn secondary"
                            style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="action-btn secondary"
                            style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <QuantityForm
                    initialData={editingUnit}
                    onCancel={() => setShowForm(false)}
                    onSave={handleSave}
                />
            )}

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default Quantity;
