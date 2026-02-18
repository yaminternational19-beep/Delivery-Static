import React, { useState, useMemo } from 'react';
import VendorProductStats from './components/VendorProductStats';
import VendorProductFilters from './components/VendorProductFilters';
import VendorProductList from './components/VendorProductList';
import AddProduct from './components/AddProduct/AddProduct';
import { FileText, Download, ArrowLeft } from 'lucide-react';

const VendorProductsPage = () => {

    const MOCK_PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
        id: `PROD-${1000 + i}`,
        itemId: `ITEM-${1000 + i}`,
        name: `Product ${i}`,
        brand: ['Sony', 'Noise', 'Samsung'][i % 3],
        category: ['Electronics', 'Fashion', 'Groceries'][i % 3],
        subCategory: ['Mobile', 'Shoes', 'Drinks'][i % 3],
        MRP: (i + 1) * 150,
        stock: Math.floor(Math.random() * 20),   // ✅ added
        image: `https://source.unsplash.com/random/200x200?product,${i}`,
        isApproved: i % 3 !== 0,
        rejectionReason: i % 7 === 0 ? 'Incorrect image' : null,
        createdAt: new Date().toISOString().split('T')[0]
    }));


    const [products] = useState(MOCK_PRODUCTS);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddPage, setShowAddPage] = useState(false);


    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    });

    const [filters, setFilters] = useState({
        search: '',
        brand: '',
        category: '',
        subCategory: ''
    });

    const stats = {
        total: products.length,
        inStock: products.filter(p => p.stock > 10).length,
        lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
        outOfStock: products.filter(p => p.stock === 0).length
    };



    const filteredProducts = useMemo(() => {
        return products.filter(p => {

            const searchMatch =
                !filters.search ||
                p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.brand.toLowerCase().includes(filters.search.toLowerCase());

            const brandMatch =
                !filters.brand || p.brand === filters.brand;

            const categoryMatch =
                !filters.category || p.category === filters.category;

            const subCategoryMatch =
                !filters.subCategory || p.subCategory === filters.subCategory;

            const stockMatch =
                !filters.stock ||
                (filters.stock === 'high' && p.stock > 10) ||
                (filters.stock === 'low' && p.stock > 0 && p.stock <= 10) ||
                (filters.stock === 'out' && p.stock === 0);

            const statusMatch =
                !filters.status ||
                (filters.status === 'approved' && p.isApproved) ||
                (filters.status === 'pending' && !p.isApproved && !p.rejectionReason) ||
                (filters.status === 'rejected' && p.rejectionReason);

            return searchMatch && brandMatch && categoryMatch && subCategoryMatch && stockMatch && statusMatch;

        });
    }, [products, filters]);


    const paginatedData = useMemo(() => {
        const start = (pagination.page - 1) * pagination.limit;
        return filteredProducts.slice(start, start + pagination.limit);
    }, [filteredProducts, pagination]);

    const totalPages = Math.ceil(filteredProducts.length / pagination.limit);

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRows(prev => [...prev, id]);
        } else {
            setSelectedRows(prev => prev.filter(r => r !== id));
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(paginatedData.map(p => p.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleExport = (type) => {
        const data = selectedRows.length > 0
            ? products.filter(p => selectedRows.includes(p.id))
            : filteredProducts;

        console.log(`Exporting ${data.length} records to ${type}`);
    };


    return (
        <div className="products-module management-module">

            {!showAddPage ? (

                <>
                    {/* Header */}
                    <div className="products-header" style={{ marginBottom: '24px' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700 }}>
                                Vendor Products
                            </h1>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                Manage your product inventory
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className="action-btn secondary"
                                onClick={() => handleExport('excel')}
                            >
                                <FileText size={18} /> Excel
                            </button>

                            <button
                                className="action-btn secondary"
                                onClick={() => handleExport('pdf')}
                            >
                                <Download size={18} /> PDF
                            </button>

                            <button
                                className="action-btn primary"
                                onClick={() => setShowAddPage(true)}
                            >
                                Add Product
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <VendorProductStats stats={stats} />

                    {/* Filters */}
                    <VendorProductFilters
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({
                            search: '',
                            brand: '',
                            category: '',
                            subCategory: '',
                            stock: '',
                            status: ''
                        })}
                    />

                    {/* Table */}
                    <VendorProductList
                        products={paginatedData}
                        selectedRows={selectedRows}
                        onSelectRow={handleSelectRow}
                        onSelectAll={handleSelectAll}
                    />

                    {/* Pagination */}
                    <div className="vendor-pagination">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() =>
                                setPagination(prev => ({ ...prev, page: prev.page - 1 }))
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {pagination.page} of {totalPages || 1}
                        </span>

                        <button
                            disabled={pagination.page === totalPages}
                            onClick={() =>
                                setPagination(prev => ({ ...prev, page: prev.page + 1 }))
                            }
                        >
                            Next
                        </button>
                    </div>
                </>

            ) : (

                <>
                    {/* Add Product Header */}
                    <div className="products-add-header" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '32px'
                    }}>
                        <button
                            className="action-btn secondary"
                            onClick={() => setShowAddPage(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                fontWeight: 600
                            }}
                        >
                            <ArrowLeft size={18} /> Back
                        </button>
                        
                    </div>

                    {/* Add Product Component */}
                    <AddProduct
                        onProductAdded={() => {
                            setShowAddPage(false);
                        }}
                    />
                </>

            )}

        </div>
    );

};

export default VendorProductsPage;
