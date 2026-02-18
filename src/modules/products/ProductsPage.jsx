import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Download, FileText } from 'lucide-react';
import ProductStats from './components/ProductStats';
import ProductFilters from './components/ProductFilters';
import ProductList from './components/ProductList';
import Toast from '../../components/common/Toast/Toast';
import './Products.css';

// Mock Data Generation
const MOCK_PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
    id: `PROD-${1000 + i}`,
    itemId: `ITEM-${1000 + i}`,
    name: i % 3 === 0 ? `Premium Wireless Headphones ${i}` : i % 3 === 1 ? `Organic Green Tea ${i}` : `Smart Fitness Watch ${i}`,
    productFullName: i % 3 === 0 ? `Premium Wireless Noise Cancelling Headphones v${i}` : i % 3 === 1 ? `100% Organic Himalayan Green Tea ${i}` : `Smart Fitness Track Pro Series ${i}`,
    brand: i % 4 === 0 ? 'Sony' : i % 4 === 1 ? 'Organic India' : i % 4 === 2 ? 'Noise' : 'Samsung',
    vendor: `VEN-${100 + (i % 5)}`,
    vendorName: i % 5 === 0 ? 'John Doe' : 'Jane Smith',
    vendorCompanyName: i % 5 === 0 ? 'TechSolution Ltd' : i % 5 === 1 ? 'GroceryMart' : 'FashionHub Inc',
    vendorPhone: i % 5 === 0 ? '+91 98765 43210' : '+91 87654 32109',
    vendorEmail: i % 5 === 0 ? 'john.doe@techsolution.com' : 'jane.smith@grocerymart.in',
    category: i % 3 === 0 ? 'Electronics' : i % 3 === 1 ? 'Groceries' : 'Fashion',
    subCategory: i % 3 === 0 ? (i % 2 === 0 ? 'Mobile' : 'Laptop') : (i % 3 === 1 ? 'Drinks' : 'Shoes'),
    MRP: (i + 1) * 150,
    image: `https://source.unsplash.com/random/200x200?product,${i}`,
    isApproved: i % 10 < 7, // 70% approved
    rejectionReason: i % 10 === 8 ? 'Incorrect image format provided' : i % 10 === 9 ? 'Price exceeds range' : null,
    raisedDate: new Date(Date.now() - 86400000 * (i + 5)).toISOString().split('T')[0],
    actionDate: i % 10 < 8 ? new Date(Date.now() - 86400000 * i).toISOString().split('T')[0] : null,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
}));

const ProductsPage = () => {
    // State
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        vendor: '',
        brand: '',
        category: '',
        subCategory: '',
        fromDate: '',
        toDate: '',
        isApproved: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const [selectedRows, setSelectedRows] = useState([]);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // Simulate Fetching Data
    useEffect(() => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setProducts(MOCK_PRODUCTS);
            setLoading(false);
        }, 800);
    }, []);

    // Filtering Logic (Client-side simulation of Backend Logic)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Search
            const searchMatch = !filters.search ||
                product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.vendorCompanyName.toLowerCase().includes(filters.search.toLowerCase());

            // Vendor
            const vendorMatch = !filters.vendor || product.vendorCompanyName.includes(filters.vendor);

            // Brand
            const brandMatch = !filters.brand || product.brand === filters.brand;

            // Category
            const categoryMatch = !filters.category || product.category === filters.category;

            // Sub Category
            const subCategoryMatch = !filters.subCategory || product.subCategory === filters.subCategory;

            // Status
            const statusMatch = filters.isApproved === '' ||
                (filters.isApproved === 'true' && product.isApproved) ||
                (filters.isApproved === 'false' && !product.isApproved && !product.rejectionReason) ||
                (filters.isApproved === 'rejected' && product.rejectionReason);

            // Date Range
            let dateMatch = true;
            if (filters.fromDate) {
                dateMatch = dateMatch && new Date(product.raisedDate) >= new Date(filters.fromDate);
            }
            if (filters.toDate) {
                dateMatch = dateMatch && new Date(product.raisedDate) <= new Date(filters.toDate);
            }

            return searchMatch && vendorMatch && brandMatch && categoryMatch && subCategoryMatch && statusMatch && dateMatch;
        });
    }, [products, filters]);

    // Pagination Logic
    const paginatedData = useMemo(() => {
        const start = (pagination.page - 1) * pagination.limit;
        const end = start + pagination.limit;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, pagination.page, pagination.limit]);

    // Update Pagination Stats
    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            total: filteredProducts.length,
            totalPages: Math.ceil(filteredProducts.length / prev.limit)
        }));
        // Reset to page 1 if filters change
        if (pagination.page > Math.ceil(filteredProducts.length / pagination.limit) && filteredProducts.length > 0) {
            setPagination(prev => ({ ...prev, page: 1 }));
        }
    }, [filteredProducts.length, pagination.limit]);


    // Handlers
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleAction = (action, product) => {
        if (action === 'approve') {
            const updatedProducts = products.map(p =>
                p.id === product.id ? { ...p, isApproved: true, rejectionReason: null, actionDate: new Date().toISOString().split('T')[0] } : p
            );
            setProducts(updatedProducts);
            showToast(`Product "${product.name}" approved successfully!`);
        } else if (action === 'reject') {
            const reason = prompt(`Please enter a rejection reason for "${product.name}":`);
            if (reason) {
                const updatedProducts = products.map(p =>
                    p.id === product.id ? { ...p, isApproved: false, rejectionReason: reason, actionDate: new Date().toISOString().split('T')[0] } : p
                );
                setProducts(updatedProducts);
                showToast(`Product "${product.name}" rejected.`, 'error');
            }
        }
    };

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRows(prev => [...prev, id]);
        } else {
            setSelectedRows(prev => prev.filter(rowId => rowId !== id));
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(paginatedData.map(p => p.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleExport = (format) => {
        const dataToExport = selectedRows.length > 0
            ? products.filter(p => selectedRows.includes(p.id))
            : filteredProducts;

        showToast(`Exporting ${dataToExport.length} items to ${format.toUpperCase()}...`);
    };

    // Calculate Stats
    const stats = {
        total: products.length,
        active: products.filter(p => p.isApproved).length,
        pending: products.filter(p => !p.isApproved && !p.rejectionReason).length,
        outOfStock: products.filter(p => p.rejectionReason).length // Use for rejected
    };

    return (
        <div className="products-module management-module">
            {/* Header */}
            <div className="products-header" style={{ marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>Product Approvals</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                        Review and manage product listings from your vendors
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className="action-btn secondary"
                        onClick={() => handleExport('excel')}
                    >
                        <FileText size={18} /> Export Excel
                    </button>
                    <button
                        className="action-btn secondary"
                        onClick={() => handleExport('pdf')}
                    >
                        <Download size={18} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Stats */}
            <ProductStats stats={stats} />

            {/* Filter Bar */}
            <ProductFilters
                filters={filters}
                setFilters={setFilters}
                onClear={() => setFilters({
                    search: '', vendor: '', brand: '', category: '', subCategory: '', fromDate: '', toDate: '', isApproved: ''
                })}
            />

            {/* Product List Table */}
            {loading ? (
                <div style={{ padding: '80px', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div className="spinner" style={{ marginBottom: '16px' }}></div>
                    <div style={{ color: '#64748b', fontWeight: 500 }}>Fetching latest products...</div>
                </div>
            ) : (
                <>
                    <ProductList
                        products={paginatedData}
                        selectedRows={selectedRows}
                        onAction={handleAction}
                        onSelectRow={handleSelectRow}
                        onSelectAll={handleSelectAll}
                    />

                    {/* Pagination Controls */}
                    <div style={{ padding: '16px 20px', background: 'white', border: '1px solid var(--border-color)', borderTop: 'none', borderRadius: '0 0 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Showing {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                className="mini-btn secondary"
                                disabled={pagination.page === 1}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                            >
                                Previous
                            </button>
                            <span style={{ display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: '0.9rem', fontWeight: 500 }}>
                                Page {pagination.page} of {pagination.totalPages || 1}
                            </span>
                            <button
                                className="mini-btn secondary"
                                disabled={pagination.page === pagination.totalPages || pagination.totalPages === 0}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
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

export default ProductsPage;
