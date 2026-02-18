import React, { useState } from 'react';
import { Save, Plus, Info, Trash2, Tag, Archive, DollarSign, Layers, ClipboardEdit, Image as ImageIcon, Briefcase, Ruler, Palette, FileText, ChevronDown } from 'lucide-react';
import { validateProduct } from './ExcelParser';

const ProductForm = ({ onSave, showToast, categories, brands }) => {
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

    return (
        <div className={`premium-single-card-form ${resetAnim ? 'animate-form-reset' : ''}`}>
            {/* Header Section */}
            <div className="form-head-card">
                <div className="icon-badge">
                    <ImageIcon size={40} className="icon-primary" />
                </div>
                <h2>Add New Product</h2>
                <p>Fill in the details to add your product to the marketplace</p>
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)}>
                {/* Product Media */}
                <div className="card-inner-section">
                    <h3 className="inner-title">Product Media</h3>
                    <div className="image-upload-flow">
                        <label className="upload-trigger-box">
                            <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                            <div className="upload-icon-wrapper">
                                <Plus size={24} className="upload-icon-teal" />
                            </div>
                            <p className="upload-text-teal">Click to Upload</p>
                        </label>

                        {product.images.map((img, i) => (
                            <div key={i} className="image-preview-card">
                                <img src={URL.createObjectURL(img)} alt={`Preview ${i}`} />
                                <button type="button" className="remove-overlay" onClick={() => removeImage(i)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Basic Information */}
                <div className="card-inner-section">
                    <h3 className="inner-title">Basic Information</h3>
                    <div className="v-input-group">
                        <label>Category *</label>
                        <div className="select-wrapper">
                            <select
                                className={errors.category ? 'invalid' : ''}
                                value={product.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                <option value="Other">Other (Custom)</option>
                            </select>
                            <ChevronDown className="select-icon" size={16} />
                        </div>
                        {errors.category && <span className="error-text">{errors.category}</span>}
                    </div>

                    {product.category === 'Other' && (
                        <div className="v-input-group animate-fade-in">
                            <label>Custom Category Name *</label>
                            <input
                                placeholder="Enter your category"
                                value={product.customCategory}
                                onChange={(e) => handleChange('customCategory', e.target.value)}
                            />
                        </div>
                    )}

                    <div className="v-input-group">
                        <label>Product Name *</label>
                        <input
                            className={errors.name ? 'invalid' : ''}
                            placeholder="e.g. Premium Half Sleeve T-Shirt"
                            value={product.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="v-input-group">
                        <label>Brand Name</label>
                        <div className="select-wrapper">
                            <select value={product.brand} onChange={(e) => handleChange('brand', e.target.value)}>
                                <option value="">Select Brand</option>
                                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                <option value="Other">Other (Custom)</option>
                            </select>
                            <ChevronDown className="select-icon" size={16} />
                        </div>
                    </div>

                    {product.brand === 'Other' && (
                        <div className="v-input-group animate-fade-in">
                            <label>Custom Brand Name</label>
                            <input
                                placeholder="Enter your brand"
                                value={product.customBrand}
                                onChange={(e) => handleChange('customBrand', e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* Details & Specs */}
                <div className="card-inner-section">
                    <h3 className="inner-title">Details & Specifications</h3>
                    <div className="v-input-group">
                        <label>Specification *</label>
                        <textarea
                            rows="3"
                            placeholder="Key features, technical specs, etc."
                            className={errors.specification ? 'invalid' : ''}
                            value={product.specification}
                            onChange={(e) => handleChange('specification', e.target.value)}
                        />
                    </div>
                    <div className="v-input-group">
                        <label>Product Description *</label>
                        <textarea
                            rows="4"
                            placeholder="Detailed product story and information"
                            className={errors.description ? 'invalid' : ''}
                            value={product.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                    </div>

                    <div className="v-input-grid">
                        <div className="v-input-group">
                            <label>Size</label>
                            <input placeholder="Medium, XL, etc." value={product.size} onChange={(e) => handleChange('size', e.target.value)} />
                        </div>
                        <div className="v-input-group">
                            <label>Colors</label>
                            <input placeholder="Red, Black & White" value={product.colors} onChange={(e) => handleChange('colors', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="card-inner-section">
                    <h3 className="inner-title">Pricing & Inventory</h3>
                    <div className="v-input-grid">
                        <div className="v-input-group">
                            <label>MRP *</label>
                            <div className="input-with-symbol">
                                <span>$</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className={errors.price ? 'invalid' : ''}
                                    value={product.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                />
                            </div>
                            {errors.price && <span className="error-text">{errors.price}</span>}
                        </div>
                        <div className="v-input-group">
                            <label>Sale Price</label>
                            <div className="input-with-symbol">
                                <span>$</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={product.salePrice}
                                    onChange={(e) => handleChange('salePrice', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="show-price-toggle">
                        <input
                            type="checkbox"
                            id="showPrice"
                            checked={product.showPrice}
                            onChange={(e) => handleChange('showPrice', e.target.checked)}
                        />
                        <label htmlFor="showPrice">Display price to customers</label>
                    </div>

                    <div className="v-input-grid">
                        <div className="v-input-group">
                            <label>Stock Quantity *</label>
                            <input
                                type="number"
                                placeholder="0"
                                className={errors.stock ? 'invalid' : ''}
                                value={product.stock}
                                onChange={(e) => handleChange('stock', e.target.value)}
                            />
                        </div>
                        <div className="v-input-group">
                            <label>Min Order Qty *</label>
                            <input
                                type="number"
                                placeholder="1"
                                value={product.minOrder}
                                onChange={(e) => handleChange('minOrder', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="v-input-group">
                        <label>SKU (Stock Keeping Unit) *</label>
                        <input
                            className={errors.sku ? 'invalid' : ''}
                            placeholder="SKU-123456"
                            value={product.sku}
                            onChange={(e) => handleChange('sku', e.target.value)}
                        />
                        {errors.sku && <span className="error-text">{errors.sku}</span>}
                    </div>
                </div>

                {/* Form Footer */}
                <div className="card-form-footer">
                    <button type="button" className="btn-save-draft" onClick={(e) => handleSubmit(e, false)}>
                        <Save size={18} /> Save Product
                    </button>
                    <button type="button" className="btn-add-primary" onClick={(e) => handleSubmit(e, true)}>
                        <Plus size={20} /> Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
