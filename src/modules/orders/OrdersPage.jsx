import React, { useState, useEffect, useMemo } from 'react';
import { Download, FileText, X, Clock, MapPin, CheckCircle } from 'lucide-react';
import OrderStats from './components/OrderStats';
import OrderFilters from './components/OrderFilters';
import OrderList from './components/OrderList';
import Toast from '../../components/common/Toast/Toast';
import './Orders.css';

// Mock Data Generation
const MOCK_ORDERS = Array.from({ length: 50 }, (_, i) => {
    const statuses = ['Delivered', 'On the Way', 'Pending', 'Cancelled'];
    const status = statuses[i % 4];
    return {
        id: `ORD-${2000 + i}`,
        customerId: `CUST-${100 + i}`,
        customerName: i % 3 === 0 ? 'John Wick' : i % 3 === 1 ? 'Bruce Wayne' : 'Clark Kent',
        customerEmail: i % 3 === 0 ? 'wick@example.com' : i % 3 === 1 ? 'wayne@enterprises.com' : 'kent@dailyplanet.com',
        customerPhone: i % 2 === 0 ? '+91 99999 88888' : '+91 77777 66666',
        riderId: `RID-${500 + i}`,
        riderName: i % 3 === 0 ? 'Alex Rider' : i % 3 === 1 ? 'Sam Smith' : 'Jordan Lee',
        itemId: `ITEM-${1000 + i}`,
        itemName: i % 3 === 0 ? 'Laptop Charger' : i % 3 === 1 ? 'Leather Jacket' : 'Smartphone Case',
        brand: i % 4 === 0 ? 'Samsung' : i % 4 === 1 ? 'Nike' : i % 4 === 2 ? 'Sony' : 'Apple',
        vendorCompanyName: i % 4 === 0 ? 'Tech Mart' : i % 4 === 1 ? 'Fashion Ave' : 'Global Electronics',
        vendorName: i % 2 === 0 ? 'John Doe' : 'Jane Smith',
        vendorPhone: i % 2 === 0 ? '+91 91234 56789' : '+91 82345 67890',
        vendorEmail: i % 2 === 0 ? 'john.doe@techmart.com' : 'jane.smith@fashionave.com',
        category: i % 3 === 0 ? 'Electronics' : i % 3 === 1 ? 'Fashion' : 'Accessories',
        subCategory: i % 3 === 0 ? (i % 2 === 0 ? 'Mobile' : 'Laptop') : 'Footwear',
        productName: i % 3 === 0 ? 'Laptop Charger' : i % 3 === 1 ? 'Leather Jacket' : 'Smartphone Case',
        status: status,
        riderContact: `+1 555-0${100 + i}`,
        riderEmail: `rider${500 + i}@delivery.com`,
        orderedDate: new Date(Date.now() - (i * 86400000 + Math.random() * 43200000)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/,/g, ''),
        deliveredDate: status === 'Delivered' ? new Date(Date.now() - (i * 86400000)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/,/g, '') : '---',
        createdAt: new Date(Date.now() - (i * 86400000)).toISOString(),
        orderItems: [
            { name: i % 3 === 0 ? 'Laptop Charger' : i % 3 === 1 ? 'Leather Jacket' : 'Smartphone Case', qty: 1, price: '$45.00' },
            { name: 'Priority Delivery', qty: 1, price: '$5.00' }
        ],
        riderStats: {
            totalOrders: 120 + i,
            avgTimePerOrder: `${25 + (i % 15)} mins`,
            successRate: '98%',
            activeSince: 'Jan 2024'
        }
    };
});

const OrdersPage = () => {
    // State
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        brand: '',
        vendor: '',
        category: '',
        subCategory: '',
        status: '',
        fromDate: '',
        toDate: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const [selectedRows, setSelectedRows] = useState([]);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [selectedRider, setSelectedRider] = useState(null);

    // Simulate Fetching Data
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setOrders(MOCK_ORDERS);
            setLoading(false);
        }, 800);
    }, []);

    // Filtering Logic
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const searchMatch = !filters.search ||
                order.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.customerId.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.itemName.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.vendorCompanyName.toLowerCase().includes(filters.search.toLowerCase());

            const vendorMatch = !filters.vendor || order.vendorCompanyName.includes(filters.vendor);
            const brandMatch = !filters.brand || order.brand === filters.brand;
            const categoryMatch = !filters.category || order.category === filters.category;
            const subCategoryMatch = !filters.subCategory || order.subCategory === filters.subCategory;
            const statusMatch = !filters.status || order.status.toLowerCase() === filters.status.toLowerCase();

            let dateMatch = true;
            if (filters.fromDate) {
                dateMatch = dateMatch && new Date(order.createdAt) >= new Date(filters.fromDate);
            }
            if (filters.toDate) {
                dateMatch = dateMatch && new Date(order.createdAt) <= new Date(filters.toDate);
            }

            return searchMatch && vendorMatch && brandMatch && categoryMatch && subCategoryMatch && statusMatch && dateMatch;
        });
    }, [orders, filters]);

    // Pagination Logic
    const paginatedData = useMemo(() => {
        const start = (pagination.page - 1) * pagination.limit;
        const end = start + pagination.limit;
        return filteredOrders.slice(start, end);
    }, [filteredOrders, pagination.page, pagination.limit]);

    // Update Pagination Stats
    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            total: filteredOrders.length,
            totalPages: Math.ceil(filteredOrders.length / prev.limit)
        }));
        if (pagination.page > Math.ceil(filteredOrders.length / pagination.limit) && filteredOrders.length > 0) {
            setPagination(prev => ({ ...prev, page: 1 }));
        }
    }, [filteredOrders.length, pagination.limit]);

    // Handlers
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleAction = (action, order) => {
        if (action === 'view') {
            setSelectedRider(order);
        } else if (action === 'terminate') {
            if (window.confirm(`Are you sure you want to deactivate account for rider ${order.riderName}?`)) {
                showToast(`Rider ${order.riderName} account has been deactivated.`, 'error');
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
            setSelectedRows(paginatedData.map(o => o.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleExport = (format) => {
        const dataToExport = selectedRows.length > 0
            ? orders.filter(o => selectedRows.includes(o.id))
            : filteredOrders;
        showToast(`Exporting ${dataToExport.length} orders to ${format.toUpperCase()}...`);
    };

    const stats = {
        total: orders.length,
        delivered: orders.filter(o => o.status === 'Delivered').length,
        onTheWay: orders.filter(o => o.status === 'On the Way').length,
        pending: orders.filter(o => o.status === 'Pending').length
    };

    return (
        <div className="orders-module management-module">
            {/* Header */}
            <div className="orders-header">
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Order Management</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                        Track deliveries, manage riders, and monitor order stats
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="action-btn secondary" onClick={() => handleExport('excel')}>
                        <FileText size={18} /> Export Excel
                    </button>
                    <button className="action-btn secondary" onClick={() => handleExport('pdf')}>
                        <Download size={18} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Stats */}
            <OrderStats stats={stats} />

            {/* Filter Bar */}
            <OrderFilters
                filters={filters}
                setFilters={setFilters}
                onClear={() => setFilters({
                    search: '', brand: '', vendor: '', category: '', subCategory: '', status: '', fromDate: '', toDate: ''
                })}
            />

            {/* Order List Table */}
            {loading ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>Loading orders...</div>
            ) : (
                <>
                    <OrderList
                        orders={paginatedData}
                        selectedRows={selectedRows}
                        onAction={handleAction}
                        onSelectRow={handleSelectRow}
                        onSelectAll={handleSelectAll}
                    />

                    {/* Pagination */}
                    <div style={{ padding: '16px 20px', background: 'white', border: '1px solid var(--border-color)', borderTop: 'none', borderRadius: '0 0 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Showing {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} orders
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

            {/* Rider Dashboard Modal */}
            {selectedRider && (
                <div className="rider-modal-overlay">
                    <div className="rider-modal-content" style={{ maxWidth: '900px', width: '95%' }}>
                        <button className="icon-btn close-modal" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setSelectedRider(null)}>
                            <X size={24} />
                        </button>

                        <div className="rider-dash-header" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '24px' }}>
                            <div className="rider-profile-info">
                                <div className="rider-avatar" style={{ background: 'var(--primary-color)' }}>
                                    {selectedRider.customerName.charAt(0)}
                                </div>
                                <div>
                                    <h2 style={{ margin: 0 }}>Customer: {selectedRider.customerName}</h2>
                                    <p style={{ color: '#64748b', margin: '4px 0' }}>{selectedRider.customerId} | {selectedRider.customerEmail}</p>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)' }}>Contact: {selectedRider.customerPhone}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: '#64748b' }}>Order Status</p>
                                <span className={`status-badge ${selectedRider.status.toLowerCase().replace(/\s+/g, '-')}`} style={{ margin: '8px 0', fontSize: '1rem', padding: '6px 16px' }}>
                                    {selectedRider.status}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                            {/* Left Column: Customer Order Items */}
                            <div className="order-items-section">
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                    <Clock size={20} color="var(--primary-color)" /> Order Products
                                </h3>
                                <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                                <th style={{ padding: '8px', fontSize: '0.75rem', color: '#64748b' }}>PRODUCT NAME</th>
                                                <th style={{ padding: '8px', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>QTY</th>
                                                <th style={{ padding: '8px', fontSize: '0.75rem', color: '#64748b', textAlign: 'right' }}>PRICE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedRider.orderItems.map((item, idx) => (
                                                <tr key={idx} style={{ borderBottom: idx === selectedRider.orderItems.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '12px 8px', fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</td>
                                                    <td style={{ padding: '12px 8px', fontSize: '0.85rem', textAlign: 'center' }}>{item.qty}</td>
                                                    <td style={{ padding: '12px 8px', fontSize: '0.85rem', textAlign: 'right', color: 'var(--primary-color)' }}>{item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                                        <span>Total Amount Paid</span>
                                        <span style={{ color: 'var(--primary-color)' }}>$50.00</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '24px', padding: '16px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #10b981' }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#065f46', fontSize: '0.9rem' }}>Delivery Address</h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#047857' }}>Suite 405, 5th Avenue, New York, NY 10001</p>
                                </div>
                            </div>

                            {/* Right Column: Rider Details */}
                            <div className="rider-details-section">
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                    <MapPin size={20} color="#f59e0b" /> assigned Rider Details
                                </h3>
                                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                                            {selectedRider.riderName.charAt(0)}
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 700 }}>{selectedRider.riderName}</p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{selectedRider.riderId}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: '#64748b' }}>Phone</span>
                                            <span style={{ fontWeight: 600 }}>{selectedRider.riderContact}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: '#64748b' }}>Email</span>
                                            <span style={{ fontWeight: 600 }}>{selectedRider.riderEmail}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: '#64748b' }}>Performance Score</span>
                                            <span style={{ fontWeight: 600, color: '#10b981' }}>{selectedRider.riderStats.successRate}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: '#64748b' }}>Avg. Delivery Time</span>
                                            <span style={{ fontWeight: 600 }}>{selectedRider.riderStats.avgTimePerOrder}</span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>Rider History</div>
                                        <div className="rider-stat-mini" style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedRider.riderStats.totalOrders}</div>
                                                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>TOTAL TRIPS</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedRider.riderStats.activeSince}</div>
                                                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>ON BOARD</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="action-btn"
                                    style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fee2e2', width: '100%', marginTop: '24px', fontSize: '0.8rem' }}
                                    onClick={() => handleAction('terminate', selectedRider)}
                                >
                                    Report / Deactivate assigned Rider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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

export default OrdersPage;
