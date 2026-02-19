import React, { useState } from 'react';
import { Plus, Trash2, Upload, X, Archive, CheckSquare, Square } from 'lucide-react';
import { parseExcel, validateProduct } from './ExcelParser';

const BulkUploadForm = ({ onSaveAll, showToast, categories = {}, brands = [] }) => {
    const [subMode, setSubMode] = useState('manual'); // 'manual' | 'csv'
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});

    const addRow = () => {
        const newProduct = {
            id: Date.now(),
            name: '', category: '', customCategory: '', subCategory: '', brand: '', customBrand: '',
            specification: '', description: '', price: '', salePrice: '',
            showPrice: true, minOrder: '1', stock: '', sku: '', size: '', colors: '', images: []
        };
        setProducts([...products, newProduct]);
    };

    const removeRow = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const updateProduct = (index, field, value) => {
        const updated = [...products];
        updated[index] = { ...updated[index], [field]: value };
        if (field === 'category') {
            updated[index].subCategory = '';
        }
        setProducts(updated);
    };

    const handleImageUpload = (index, e) => {
        const files = Array.from(e.target.files);
        if (products[index].images.length + files.length > 10) {
            showToast('Max 10 images per product', 'error');
            return;
        }
        const updated = [...products];
        updated[index].images = [...updated[index].images, ...files];
        setProducts(updated);
    };

    const removeImage = (prodIndex, imgIndex) => {
        const updated = [...products];
        updated[prodIndex].images = updated[prodIndex].images.filter((_, i) => i !== imgIndex);
        setProducts(updated);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const data = await parseExcel(file);
            const normalized = data.map((row, idx) => ({
                id: Date.now() + idx,
                name: row.name || row.Name || '',
                category: row.category || row.Category || '',
                subCategory: row.subCategory || row.SubCategory || '',
                customCategory: '',
                brand: row.brand || row.Brand || '',
                customBrand: '',
                sku: row.sku || row.SKU || '',
                specification: row.specification || row.Specification || '',
                description: row.description || row.Description || '',
                size: row.size || row.Size || '',
                colors: row.colors || row.Colors || '',
                price: row.price || row.Price || '',
                salePrice: row.salePrice || row.SalePrice || '',
                showPrice: true,
                minOrder: row.minOrder || row.MinOrder || '1',
                stock: row.stock || row.Stock || '',
                images: []
            }));
            setProducts([...products, ...normalized]);
            showToast(`Imported ${normalized.length} products`, 'success');
        } catch (err) {
            showToast('Failed to parse file', 'error');
        }
    };

    const validateAll = () => {
        const newErrors = {};
        let isValid = true;
        if (products.length === 0) {
            showToast('Add at least one product', 'error');
            return false;
        }
        products.forEach((p, i) => {
            const v = validateProduct(p);
            if (!v.isValid) {
                newErrors[i] = v.errors;
                isValid = false;
            }
        });
        setErrors(newErrors);
        return isValid;
    };

    const handleConfirm = () => {
        if (validateAll()) {
            onSaveAll(products);
            setProducts([]);
            setErrors({});
            showToast('All products saved successfully!', 'success');
        } else {
            showToast('Please correct validation errors', 'error');
        }
    };

    const getStockBadge = (stock) => {
        const val = parseInt(stock) || 0;
        if (val === 0) return <span className="bulk-badge-dot bg-red" title="Out of Stock"></span>;
        if (val <= 5) return <span className="bulk-badge-dot bg-orange" title="Low Stock"></span>;
        return <span className="bulk-badge-dot bg-green" title="Available"></span>;
    };

    return (
        <div className="premium-bulk-panel">
            <div className="bulk-header-actions">
                <div className="sub-mode-pills">
                    <button
                        className={`pill-btn ${subMode === 'manual' ? 'active' : ''}`}
                        onClick={() => setSubMode('manual')}
                    >
                        Manual Entry
                    </button>
                    <button
                        className={`pill-btn ${subMode === 'csv' ? 'active' : ''}`}
                        onClick={() => setSubMode('csv')}
                    >
                        Excel Import
                    </button>
                </div>
                {subMode === 'csv' && (
                    <div className="quick-import-bar">
                        <Upload size={18} />
                        <input type="file" onChange={handleFileUpload} accept=".csv, .xlsx, .xls" id="csv-input" hidden />
                        <label htmlFor="csv-input">Upload Excel/CSV</label>
                    </div>
                )}
            </div>

            <div className="bulk-table-container">
                <table className="bulk-data-table">
                    <thead>
                        <tr>
                            <th className="sticky-col">#</th>
                            <th style={{ minWidth: '140px' }}>Media</th>
                            <th style={{ minWidth: '180px' }}>Categorization</th>
                            <th style={{ minWidth: '220px' }}>Product Details</th>
                            <th style={{ minWidth: '180px' }}>Brand & SKU</th>
                            <th style={{ minWidth: '240px' }}>Specification & Bio</th>
                            <th style={{ minWidth: '160px' }}>Attributes</th>
                            <th style={{ minWidth: '160px' }}>Pricing</th>
                            <th style={{ minWidth: '140px' }}>Inventory</th>
                            <th className="action-col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p.id} className={Object.keys(errors[i] || {}).length > 0 ? 'row-has-error' : ''}>
                                <td className="row-index sticky-col">{i + 1}</td>
                                <td>
                                    <div className="bulk-image-manager">
                                        <label className="add-img-cell">
                                            <Plus size={16} />
                                            <input type="file" hidden multiple accept="image/*" onChange={(e) => handleImageUpload(i, e)} />
                                        </label>
                                        <div className="img-cell-strip">
                                            {p.images.map((img, imgIdx) => (
                                                <div key={imgIdx} className="mini-preview">
                                                    <img src={URL.createObjectURL(img)} alt="" />
                                                    <button onClick={() => removeImage(i, imgIdx)} className="del-btn"><X size={10} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="cell-stack">
                                        <select
                                            className={errors[i]?.category ? 'field-error' : ''}
                                            value={p.category}
                                            onChange={(e) => updateProduct(i, 'category', e.target.value)}
                                        >
                                            <option value="">Category *</option>
                                            {Object.keys(categories).map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <select
                                            value={p.subCategory}
                                            onChange={(e) => updateProduct(i, 'subCategory', e.target.value)}
                                            disabled={!p.category || p.category === 'Other'}
                                        >
                                            <option value="">Sub Category</option>
                                            {(categories[p.category] || []).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <input
                                        placeholder="Product Name *"
                                        className={errors[i]?.name ? 'field-error' : ''}
                                        value={p.name}
                                        onChange={(e) => updateProduct(i, 'name', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <div className="cell-stack">
                                        <select
                                            value={p.brand}
                                            onChange={(e) => updateProduct(i, 'brand', e.target.value)}
                                        >
                                            <option value="">Brand</option>
                                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                        <input
                                            placeholder="SKU"
                                            value={p.sku}
                                            onChange={(e) => updateProduct(i, 'sku', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="cell-stack">
                                        <textarea
                                            placeholder="Spec highlights *"
                                            className={errors[i]?.specification ? 'field-error' : ''}
                                            value={p.specification}
                                            onChange={(e) => updateProduct(i, 'specification', e.target.value)}
                                        />
                                        <textarea
                                            placeholder="Full Description *"
                                            className={errors[i]?.description ? 'field-error' : ''}
                                            value={p.description}
                                            onChange={(e) => updateProduct(i, 'description', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="cell-stack">
                                        <input placeholder="Size" value={p.size} onChange={(e) => updateProduct(i, 'size', e.target.value)} />
                                        <input placeholder="Colors" value={p.colors} onChange={(e) => updateProduct(i, 'colors', e.target.value)} />
                                    </div>
                                </td>
                                <td>
                                    <div className="cell-stack">
                                        <div className="price-mini-box">
                                            <span>$</span>
                                            <input
                                                type="number"
                                                placeholder="MRP *"
                                                className={errors[i]?.price ? 'field-error' : ''}
                                                value={p.price}
                                                onChange={(e) => updateProduct(i, 'price', e.target.value)}
                                            />
                                        </div>
                                        <div className="price-mini-box">
                                            <span>$</span>
                                            <input
                                                type="number"
                                                placeholder="Sale"
                                                value={p.salePrice}
                                                onChange={(e) => updateProduct(i, 'salePrice', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="cell-stack">
                                        <div className="stock-input-wrapper">
                                            {getStockBadge(p.stock)}
                                            <input
                                                type="number"
                                                placeholder="Stock *"
                                                className={errors[i]?.stock ? 'field-error' : ''}
                                                value={p.stock}
                                                onChange={(e) => updateProduct(i, 'stock', e.target.value)}
                                            />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Min Order"
                                            value={p.minOrder}
                                            onChange={(e) => updateProduct(i, 'minOrder', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td className="action-col">
                                    <button className="row-action-btn del" onClick={() => removeRow(p.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="bulk-empty-state">
                        <div className="empty-visual">
                            <Archive size={48} />
                        </div>
                        <h3>No Products Added</h3>
                        <p>Click below to start manual entry or upload an Excel file.</p>
                        <button className="empty-add-btn" onClick={addRow}>
                            <Plus size={18} /> Add Your First Row
                        </button>
                    </div>
                )}
            </div>

            <div className="bulk-panel-footer">
                {products.length > 0 && (
                    <button className="add-row-btn-secondary" onClick={addRow}>
                        <Plus size={18} /> Add Another Row
                    </button>
                )}
                <div className="footer-right-group">
                    <button className="clear-all-btn" onClick={() => setProducts([])}>Clear Matrix</button>
                    <button className="save-all-btn" onClick={handleConfirm}>Confirm & Save All</button>
                </div>
            </div>
        </div>
    );
};

export default BulkUploadForm;
