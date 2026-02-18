import React, { useState } from 'react';
import { Plus, Trash2, Upload, X, Archive, CheckSquare, Square } from 'lucide-react';
import { parseExcel, validateProduct } from './ExcelParser';

const BulkUploadForm = ({ onSaveAll, showToast, categories, brands }) => {
    const [subMode, setSubMode] = useState('manual'); // 'manual' | 'csv'
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});

    const addRow = () => {
        const newProduct = {
            id: Date.now(),
            name: '', category: '', customCategory: '', brand: '', customBrand: '',
            specification: '', description: '', price: '', salePrice: '',
            showPrice: true, minOrder: '1', stock: '', sku: '', images: []
        };
        setProducts([...products, newProduct]);
    };

    const removeRow = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    const updateProduct = (index, field, value) => {
        const updated = [...products];
        updated[index] = { ...updated[index], [field]: value };
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
                customCategory: '',
                brand: row.brand || row.Brand || '',
                customBrand: '',
                specification: row.specification || row.Specification || '',
                description: row.description || row.Description || '',
                price: row.price || row.Price || '',
                salePrice: row.salePrice || row.SalePrice || '',
                showPrice: true,
                minOrder: row.minOrder || row.MinOrder || '1',
                stock: row.stock || row.Stock || '',
                sku: row.sku || row.SKU || '',
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
            showToast('Check for errors in the table', 'error');
        }
    };

    const getStockBadge = (stock) => {
        const val = parseInt(stock) || 0;
        if (val === 0) return <span className="stock-badge stock-red">0 (Out)</span>;
        if (val <= 5) return <span className="stock-badge stock-light-red">{val} (Low)</span>;
        if (val <= 10) return <span className="stock-badge stock-amber">{val} (Warning)</span>;
        return <span className="stock-badge stock-green">{val} (In Stock)</span>;
    };

    return (
        <div className="bulk-upload-wrapper">
            <div className="bulk-sub-mode-tabs">
                <button
                    className={`sub-tab ${subMode === 'manual' ? 'active' : ''}`}
                    onClick={() => setSubMode('manual')}
                >
                    Manual Multi-Row Entry
                </button>
                <button
                    className={`sub-tab ${subMode === 'csv' ? 'active' : ''}`}
                    onClick={() => setSubMode('csv')}
                >
                    Excel / CSV Import
                </button>
            </div>

            {subMode === 'csv' && (
                <div className="csv-upload-drop-section">
                    <div className="upload-dropzone">
                        <Upload size={32} className="upload-icon" />
                        <h3>Import Inventory File</h3>
                        <p>Upload .xlsx, .xls or .csv (Max 5MB)</p>
                        <input type="file" onChange={handleFileUpload} accept=".csv, .xlsx, .xls" />
                    </div>
                </div>
            )}

            <div className="bulk-table-scroll-container">
                <table className="premium-bulk-table">
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>#</th>
                            <th style={{ width: '180px' }}>Category *</th>
                            <th style={{ width: '140px' }}>Images *</th>
                            <th style={{ width: '220px' }}>Product Name *</th>
                            <th style={{ width: '150px' }}>Brand</th>
                            <th style={{ width: '250px' }}>Specification *</th>
                            <th style={{ width: '250px' }}>Description *</th>
                            <th style={{ width: '140px' }}>Price *</th>
                            <th style={{ width: '130px' }}>Show Price</th>
                            <th style={{ width: '100px' }}>Min</th>
                            <th style={{ width: '140px' }}>Quantity *</th>
                            <th style={{ width: '60px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p.id}>
                                <td className="row-number">{i + 1}</td>
                                <td>
                                    <div className="table-col-stack">
                                        <select
                                            className={errors[i]?.category ? 'invalid' : ''}
                                            value={p.category}
                                            onChange={(e) => updateProduct(i, 'category', e.target.value)}
                                        >
                                            <option value="">Category</option>
                                            {Object.keys(categories).map(c => <option key={c} value={c}>{c}</option>)}
                                            <option value="Other">Other</option>
                                        </select>
                                        {p.category === 'Other' && (
                                            <input
                                                placeholder="Custom"
                                                className="table-mini-input"
                                                value={p.customCategory}
                                                onChange={(e) => updateProduct(i, 'customCategory', e.target.value)}
                                            />
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="table-image-gallery">
                                        <label className="tiny-add-img">
                                            <Plus size={14} />
                                            <input type="file" hidden multiple accept="image/*" onChange={(e) => handleImageUpload(i, e)} />
                                        </label>
                                        {p.images.map((img, imgIdx) => (
                                            <div key={imgIdx} className="tiny-img-preview">
                                                <img src={URL.createObjectURL(img)} alt="" />
                                                <button className="remove-tiny" onClick={() => removeImage(i, imgIdx)}><X size={8} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <input
                                        placeholder="Product Name"
                                        className={errors[i]?.name ? 'invalid' : ''}
                                        value={p.name}
                                        onChange={(e) => updateProduct(i, 'name', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <div className="table-col-stack">
                                        <select
                                            value={p.brand}
                                            onChange={(e) => updateProduct(i, 'brand', e.target.value)}
                                        >
                                            <option value="">Brand</option>
                                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                            <option value="Other">Other</option>
                                        </select>
                                        {p.brand === 'Other' && (
                                            <input
                                                placeholder="Custom"
                                                className="table-mini-input"
                                                value={p.customBrand}
                                                onChange={(e) => updateProduct(i, 'customBrand', e.target.value)}
                                            />
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <textarea
                                        placeholder="Features..."
                                        className={errors[i]?.specification ? 'invalid' : ''}
                                        value={p.specification}
                                        onChange={(e) => updateProduct(i, 'specification', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        placeholder="Info..."
                                        className={errors[i]?.description ? 'invalid' : ''}
                                        value={p.description}
                                        onChange={(e) => updateProduct(i, 'description', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className={errors[i]?.price ? 'invalid' : ''}
                                        value={p.price}
                                        onChange={(e) => updateProduct(i, 'price', e.target.value)}
                                    />
                                </td>
                                <td align="center">
                                    <button
                                        className={`checkbox-btn ${p.showPrice ? 'checked' : ''}`}
                                        onClick={() => updateProduct(i, 'showPrice', !p.showPrice)}
                                    >
                                        {p.showPrice ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={p.minOrder}
                                        onChange={(e) => updateProduct(i, 'minOrder', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <div className="table-col-stack">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className={errors[i]?.stock ? 'invalid' : ''}
                                            value={p.stock}
                                            onChange={(e) => updateProduct(i, 'stock', e.target.value)}
                                        />
                                        {getStockBadge(p.stock)}
                                    </div>
                                </td>
                                <td>
                                    <button className="table-row-delete" onClick={() => removeRow(i)}>
                                        <Trash2 size={16} color="#94a3b8" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="table-empty-body">
                        <Archive size={48} className="empty-icon" />
                        <p>Begin by adding rows or importing a file</p>
                        <button className="btn-table-add" onClick={addRow}>+ Add Row</button>
                    </div>
                )}
            </div>

            <div className="bulk-form-footer">
                <div className="footer-left">
                    <button className="btn-table-add-more" onClick={addRow}>
                        <Plus size={18} /> Add New Row
                    </button>
                </div>
                <div className="footer-right">
                    <button className="btn-table-clear" onClick={() => setProducts([])}>Clear All</button>
                    <button className="btn-table-confirm" onClick={handleConfirm}>Confirm & Save All</button>
                </div>
            </div>
        </div>
    );
};

export default BulkUploadForm;
