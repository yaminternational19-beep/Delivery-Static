import React, { useState } from 'react';
import ProductForm from './ProductForm';
import BulkUploadForm from './BulkUploadForm';
import { ChevronLeft } from 'lucide-react';
import Toast from '../../../../components/common/Toast/Toast';
import './AddProduct.css';

const AddProduct = ({ onSave, categories = {}, brands = [], onBack }) => {
    const [mode, setMode] = useState('single');
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };

    const handleSingleSave = (product) => {
        onSave([product]);
        showToast('Product draft saved!');
    };

    const handleBulkSave = (products) => {
        onSave(products);
        showToast(`Successfully added ${products.length} products!`);
    };

    return (
        <div className="add-product-wrapper">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}


            <header className="add-product-header">
                <div className="header-text">
                    <h1>Add New Products</h1>
                    <p>Manage single entries or bulk inventory imports effortlessly.</p>
                </div>
                <div className="mode-tabs">
                    <button
                        className={`mode-tab ${mode === 'single' ? 'active' : ''}`}
                        onClick={() => setMode('single')}
                    >
                        Single Product
                    </button>
                    <button
                        className={`mode-tab ${mode === 'bulk' ? 'active' : ''}`}
                        onClick={() => setMode('bulk')}
                    >
                        Bulk Upload
                    </button>
                </div>
            </header>

            <main className="add-product-main">
                {mode === 'single' ? (
                    <ProductForm
                        onSave={handleSingleSave}
                        showToast={showToast}
                        categories={categories}
                        brands={brands}
                    />
                ) : (
                    <BulkUploadForm
                        onSaveAll={handleBulkSave}
                        showToast={showToast}
                        categories={categories}
                        brands={brands}
                    />
                )}
            </main>
        </div>
    );
};

export default AddProduct;
