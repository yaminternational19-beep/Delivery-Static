import React, { useState } from 'react';
import { Save, Plus, Info, Trash2, Tag, Archive, DollarSign, Layers, ClipboardEdit, Image as ImageIcon, Briefcase, Ruler, Palette, FileText, ChevronDown } from 'lucide-react';
import { validateProduct } from './ExcelParser';

const ProductForm = ({ onSave, showToast, categories = {}, brands = [] }) => {
    const initialState = {
        name: '', brand: '', customBrand: '', category: '', customCategory: '', subCategory: '',
        price: '', salePrice: '', discount: '0%', minOrder: '',
        stock: '', minStock: '', sku: '', size: '', colors: '',
        specification: '', description: '', images: [], showPrice: true
    };

    const [product, setProduct] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [resetAnim, setResetAnim] = useState(false);

    const handleChange = (field, value) => {
        const updated = { ...product, [field]: value };
        if (field === 'category') updated.subCategory = '';
        setProduct(updated);
        if (errors[field]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (product.images.length + files.length > 10) {
            showToast('Max 10 images allowed', 'error');
            return;
        }
        setProduct({ ...product, images: [...product.images, ...files] });
    };

    const removeImage = (index) => {
        setProduct({ ...product, images: product.images.filter((_, i) => i !== index) });
    };

    const handleSubmit = (e, resetAfter = false) => {
        if (e) e.preventDefault();
        const validation = validateProduct(product);
        if (!validation.isValid) {
            setErrors(validation.errors);
            showToast('Please fill all required fields', 'error');
            return;
        }
        onSave(product);
        if (resetAfter) {
            setResetAnim(true);
            setTimeout(() => setResetAnim(false), 500);
            setProduct(initialState);
            setErrors({});
            showToast('Ready for next product!', 'success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const categoriesList = Object.keys(categories || {});

    return (
        <div className={`premium-product-panel ${resetAnim ? 'animate-form-reset' : ''}`}>
            <div className="panel-header">
                <div className="header-icon-box">
                    <ImageIcon size={32} />
                </div>
                <div className="header-text-content">
                    <h2>Add New Product</h2>
                    <p>Provide detailed information to list your product in the catalog.</p>
                </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)} className="panel-body-form">
                {/* Media Section */}
                <div className="form-section-group">
                    <div className="section-label">
                        <Archive size={18} />
                        <span>Product Media</span>
                    </div>
                    <div className="image-upload-grid">
                        <label className="image-add-trigger">
                            <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                            <Plus size={24} />
                            <span>Add Photo</span>
                        </label>

                        {product.images.map((img, i) => (
                            <div key={i} className="image-entry-preview">
                                <img src={URL.createObjectURL(img)} alt={`Preview ${i}`} />
                                <button type="button" className="btn-remove-img" onClick={() => removeImage(i)}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-content-divider"></div>

                {/* Details Grid */}
                <div className="form-grid-layout">
                    {/* Category & Subcategory Row */}
                    <div className="grid-field-row">
                        <div className="form-field-unit">
                            <label>Category *</label>
                            <div className="input-wrapper">
                                <select
                                    className={errors.category ? 'field-error' : ''}
                                    value={product.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    <option value="Other">Other (Custom)</option>
                                </select>
                                <ChevronDown className="field-chevron" size={16} />
                            </div>
                            {errors.category && <span className="error-hint">{errors.category}</span>}
                        </div>

                        <div className="form-field-unit">
                            <label>Sub Category</label>
                            <div className="input-wrapper">
                                <select
                                    value={product.subCategory}
                                    onChange={(e) => handleChange('subCategory', e.target.value)}
                                    disabled={!product.category || product.category === 'Other'}
                                >
                                    <option value="">Select Sub Category</option>
                                    {(categories[product.category] || []).map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                                <ChevronDown className="field-chevron" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Custom Category IF "Other" selected */}
                    {product.category === 'Other' && (
                        <div className="form-field-unit animate-fade-in full-width">
                            <label>Custom Category Name *</label>
                            <input
                                placeholder="Enter custom category"
                                value={product.customCategory}
                                onChange={(e) => handleChange('customCategory', e.target.value)}
                            />
                        </div>
                    )}

                    {/* Name Row */}
                    <div className="form-field-unit full-width">
                        <label>Product Name *</label>
                        <input
                            className={errors.name ? 'field-error' : ''}
                            placeholder="e.g. Wireless Smart Controller"
                            value={product.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                        {errors.name && <span className="error-hint">{errors.name}</span>}
                    </div>

                    {/* Brand & SKU Row */}
                    <div className="grid-field-row">
                        <div className="form-field-unit">
                            <label>Brand Name</label>
                            <div className="input-wrapper">
                                <select value={product.brand} onChange={(e) => handleChange('brand', e.target.value)}>
                                    <option value="">Select Brand</option>
                                    {(brands || []).map(b => <option key={b} value={b}>{b}</option>)}
                                    <option value="Other">Other (Custom)</option>
                                </select>
                                <ChevronDown className="field-chevron" size={16} />
                            </div>
                        </div>

                        <div className="form-field-unit">
                            <label>SKU (Internal Code)</label>
                            <input
                                placeholder="e.g. SKU-882910"
                                value={product.sku}
                                onChange={(e) => handleChange('sku', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Custom Brand IF "Other" selected */}
                    {product.brand === 'Other' && (
                        <div className="form-field-unit animate-fade-in full-width">
                            <label>Custom Brand Name</label>
                            <input
                                placeholder="Enter custom brand"
                                value={product.customBrand}
                                onChange={(e) => handleChange('customBrand', e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="form-content-divider"></div>

                {/* Specs & Description Section */}
                <div className="form-section-group">
                    <div className="section-label">
                        <FileText size={18} />
                        <span>Product Description & Specifications</span>
                    </div>
                    <div className="form-text-area-group">
                        <div className="form-field-unit">
                            <label>Brief Specification *</label>
                            <textarea
                                rows="3"
                                placeholder="Key highlights (one per line)..."
                                className={errors.specification ? 'field-error' : ''}
                                value={product.specification}
                                onChange={(e) => handleChange('specification', e.target.value)}
                            />
                        </div>
                        <div className="form-field-unit">
                            <label>Main Description *</label>
                            <textarea
                                rows="4"
                                placeholder="Tell the customers about your product..."
                                className={errors.description ? 'field-error' : ''}
                                value={product.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-grid-layout">
                    <div className="grid-field-row">
                        <div className="form-field-unit">
                            <label>Available Sizes</label>
                            <input placeholder="Small, Medium, XL" value={product.size} onChange={(e) => handleChange('size', e.target.value)} />
                        </div>
                        <div className="form-field-unit">
                            <label>Available Colors</label>
                            <input placeholder="Blue, Charcoal, White" value={product.colors} onChange={(e) => handleChange('colors', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="form-content-divider"></div>

                {/* Pricing Section */}
                <div className="form-section-group">
                    <div className="section-label">
                        <DollarSign size={18} />
                        <span>Pricing & Stock</span>
                    </div>
                    <div className="form-grid-layout">
                        <div className="grid-field-row">
                            <div className="form-field-unit">
                                <label>MRP (Base Price) *</label>
                                <div className="price-input-box">
                                    <span className="currency-tag">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className={errors.price ? 'field-error' : ''}
                                        value={product.price}
                                        onChange={(e) => handleChange('price', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-field-unit">
                                <label>Selling Price</label>
                                <div className="price-input-box">
                                    <span className="currency-tag">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={product.salePrice}
                                        onChange={(e) => handleChange('salePrice', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid-field-row">
                            <div className="form-field-unit">
                                <label>Current Stock Status *</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className={errors.stock ? 'field-error' : ''}
                                    value={product.stock}
                                    onChange={(e) => handleChange('stock', e.target.value)}
                                />
                            </div>
                            <div className="form-field-unit">
                                <label>Minimum Order Requirement *</label>
                                <input
                                    type="number"
                                    placeholder="1"
                                    value={product.minOrder}
                                    onChange={(e) => handleChange('minOrder', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pricing-visibility-check">
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                checked={product.showPrice}
                                onChange={(e) => handleChange('showPrice', e.target.checked)}
                            />
                            <span className="checkbox-box"></span>
                            <span className="checkbox-text">Display pricing details to standard customers</span>
                        </label>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="panel-actions-footer">
                    <button type="button" className="action-btn-primary" onClick={(e) => handleSubmit(e, true)}>
                        <Plus size={20} />
                        <span>Add Product</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
