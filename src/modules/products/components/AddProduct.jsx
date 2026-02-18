import React, { useState } from 'react';

const AddProduct = ({ onProductAdded, existingProducts = [] }) => {

    const categories = {
        Electronics: ['Mobile', 'Laptop'],
        Fashion: ['Shoes', 'Clothing'],
        Groceries: ['Drinks', 'Snacks']
    };

    const brands = ['Sony', 'Samsung', 'Noise', 'Organic India'];

    const [form, setForm] = useState({
        name: '',
        brand: '',
        category: '',
        subCategory: '',
        price: '',
        stock: '',
        images: []
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setForm({
            ...form,
            category: e.target.value,
            subCategory: ''
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setForm(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const removeImage = (index) => {
        const updated = [...form.images];
        updated.splice(index, 1);
        setForm(prev => ({ ...prev, images: updated }));
    };

   const handleSubmit = (e) => {
    e.preventDefault();

    if (form.images.length === 0) {
        setError('At least one product image is required.');
        return;
    }

    const duplicate = existingProducts.find(p =>
        p.name.toLowerCase() === form.name.toLowerCase() ||
        p.itemId === form.itemId
    );

    if (duplicate) {
        setError('Product with same Name or Item ID already exists.');
        return;
    }

    setError('');
    console.log("Submitting:", form);

    if (onProductAdded) onProductAdded(form);

    setForm({
        itemId: '',
        name: '',
        brand: '',
        category: '',
        subCategory: '',
        price: '',
        stock: '',
        images: []
    });
};


    return (
        <div style={styles.card}>

            <h2 style={styles.title}>Add New Product</h2>

            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>

                

                

                

                <select
                    style={styles.input}
                    name="category"
                    value={form.category}
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select Category</option>
                    {Object.keys(categories).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    style={styles.input}
                    name="subCategory"
                    value={form.subCategory}
                    onChange={handleChange}
                    required
                    disabled={!form.category}
                >
                    <option value="">Select Sub Category</option>
                    {form.category &&
                        categories[form.category].map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))
                    }
                </select>
                <input
                    style={styles.input}
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <select
                        style={styles.input}
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                    >
                        <option value="">Select Brand (Optional)</option>
                        {brands.map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>


                <input
                    style={styles.input}
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />

                <input
                    style={styles.input}
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity"
                    value={form.stock}
                    onChange={handleChange}
                    required
                />

                <input
                    style={styles.input}
                    type="text"
                    name="Description"
                    placeholder="Product Description "
                    value={form.Description}
                    onChange={handleChange}
                    required
                />

                {/* Image Upload */}
                <div>

    {/* Show Upload Button Only If No Images */}
    {form.images.length === 0 && (
        <label style={styles.uploadBtn}>
            Upload Product Image *
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
            />
        </label>
    )}

    {/* Show Preview Grid If Images Exist */}
    {form.images.length > 0 && (
        <>
            <div style={styles.imageGrid}>
                {form.images.map((img, index) => (
                    <div key={index} style={styles.imageBox}>
                        <img
                            src={URL.createObjectURL(img)}
                            alt="preview"
                            style={styles.image}
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            style={styles.removeBtn}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {/* Add More Button */}
            <label style={{ ...styles.uploadBtn, marginTop: 10 }}>
                + Add More Images
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />
            </label>
        </>
    )}

</div>


                <button type="submit" style={styles.submitBtn}>
                    Save Product
                </button>

            </form>
        </div>
    );
};

const styles = {
    card: {
        background: '#fff',
        padding: 30,
        borderRadius: 14,
        border: '1px solid #e5e7eb',
        maxWidth: 650,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    title: {
        marginBottom: 20,
        fontSize: 22,
        fontWeight: 600
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    input: {
        padding: '10px 14px',
        border: '1px solid #d1d5db',
        borderRadius: 8,
        fontSize: 14
    },
    uploadBtn: {
    display: 'inline-block',
    padding: '8px 14px',
    background: '#e0e7ff',
    color: '#3730a3',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    },
    imageGrid: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        marginTop: 10
    },
    imageBox: {
        position: 'relative',
        width: 80,
        height: 80
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 8
    },
    removeBtn: {
        position: 'absolute',
        top: -6,
        right: -6,
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: 20,
        height: 20,
        cursor: 'pointer'
    },
    submitBtn: {
        padding: '10px 14px',
        background: '#4f46e5',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontWeight: 500,
        cursor: 'pointer'
    },
    error: {
        background: '#fee2e2',
        color: '#b91c1c',
        padding: 8,
        borderRadius: 6,
        marginBottom: 10
    }
    

};

export default AddProduct;
