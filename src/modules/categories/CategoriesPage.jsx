import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CategoryStats from './components/CategoryStats';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import Toast from '../../components/common/Toast/Toast';
import './Categories.css';

const CategoriesPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };

    const handleDeleteCategory = (category) => {
        showToast(`Category "${category.name}" has been deleted.`, 'success');
    };

    const handleSaveCategory = (data) => {
        setShowForm(false);
        setEditingCategory(null);
        showToast(`Category "${data.name}" has been ${editingCategory ? 'updated' : 'created'} successfully!`, 'success');
    };

    return (
        <div className="categories-module management-module">
            <div className="categories-header">
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Category Management</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                        Organize products into hierarchical categories
                    </p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => { setEditingCategory(null); setShowForm(true); }}
                >
                    <Plus size={18} /> Add New Category
                </button>
            </div>

            <CategoryStats />

            <div style={{ marginTop: '24px' }}>
                <CategoryList
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                    showToast={showToast}
                />
            </div>

            {showForm && (
                <CategoryForm
                    initialData={editingCategory}
                    onCancel={() => { setShowForm(false); setEditingCategory(null); }}
                    onSave={handleSaveCategory}
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

export default CategoriesPage;
