import React, { useState } from 'react';
import { Plus, ListTree } from 'lucide-react';
import SubCategoryStats from './components/SubCategoryStats';
import SubCategoryList from './components/SubCategoryList';
import SubCategoryForm from './components/SubCategoryForm';
import Toast from '../../components/common/Toast/Toast';
import './SubCategories.css';

const SubCategoriesPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleDelete = (item) => {
        showToast(`Sub Category "${item.name}" has been deleted.`, 'success');
    };

    const handleSave = (data) => {
        setShowForm(false);
        setEditingItem(null);
        showToast(`Sub Category "${data.name}" has been ${editingItem ? 'updated' : 'created'} successfully!`, 'success');
    };

    return (
        <div className="subcategories-module">
            <div className="subcategories-header">
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ListTree size={28} color="var(--primary-color)" />
                        Sub Category Management
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                        Manage product sub-categories and their parent categories
                    </p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => { setEditingItem(null); setShowForm(true); }}
                >
                    <Plus size={18} /> Add New Sub Category
                </button>
            </div>

            <SubCategoryStats />

            <div style={{ marginTop: '24px' }}>
                <SubCategoryList
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showToast={showToast}
                />
            </div>

            {showForm && (
                <SubCategoryForm
                    initialData={editingItem}
                    onCancel={() => { setShowForm(false); setEditingItem(null); }}
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

export default SubCategoriesPage;
