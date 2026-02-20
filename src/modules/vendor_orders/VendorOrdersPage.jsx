
import React, { useState, useMemo } from 'react';
import { Plus, Download, FileText, LayoutGrid, List } from 'lucide-react';
import VendorOrderStats from './components/VendorOrderStats';
import VendorOrderFilters from './components/VendorOrderFilters';
import VendorOrderList from './components/VendorOrderList';
import CreateVendorOrderModal from './components/CreateVendorOrderModal';
import AssignRiderModal from './components/AssignRiderModal';
import Toast from '../../components/common/Toast/Toast';
import './VendorOrders.css';

const INITIAL_MOCK_ORDERS = [
    {
        id: '1001',
        customerName: 'John Doe',
        customerId: 'CUST-1001',
        customerPhone: '+91 98888 77777',
        customerEmail: 'john@example.com',
        productsCount: 2,
        totalAmount: 38985,
        paymentMethod: 'Online',
        paymentStatus: 'Paid',
        status: 'Pending',
        assignedRider: null,
        deliveryAddress: 'Street 4, MG Road, Bangalore',
        createdDate: '19 Feb 2026',
        deliveredDate: '-',
        items: [{ name: 'Sony WH-1000XM5', productId: 'SKU-501', qty: 1, price: 29990, image: 'https://placehold.co/40' }, { name: 'Nike Air Max 270', productId: 'SKU-502', qty: 1, price: 8995 }],
        productImage: 'https://placehold.co/40'
    },
    {
        id: '1002',
        customerName: 'Alice Smith',
        customerId: 'CUST-1002',
        customerPhone: '+91 77777 66666',
        customerEmail: 'alice@example.com',
        productsCount: 1,
        totalAmount: 124999,
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        status: 'Pending',
        assignedRider: null,
        deliveryAddress: 'Flat 202, Sunshine Apts, Delhi',
        createdDate: '19 Feb 2026',
        deliveredDate: '-',
        items: [{ name: 'Samsung Galaxy S24', productId: 'SKU-601', qty: 1, price: 124999, image: 'https://placehold.co/40' }],
        productImage: 'https://placehold.co/40'
    },
    {
        id: '1003',
        customerName: 'Bob Martin',
        customerId: 'CUST-1003',
        customerPhone: '+91 90000 11111',
        customerEmail: 'bob@example.com',
        productsCount: 1,
        totalAmount: 13495,
        paymentMethod: 'Online',
        paymentStatus: 'Paid',
        status: 'Pending',
        assignedRider: null,
        deliveryAddress: 'House 12, Sector 15, Noida',
        createdDate: '18 Feb 2026',
        deliveredDate: '-',
        items: [{ name: 'Logitech G Pro X', productId: 'SKU-701', qty: 1, price: 13495, image: 'https://placehold.co/40' }],
        productImage: 'https://placehold.co/40'
    },
    {
        id: '1004',
        customerName: 'Carol White',
        customerId: 'CUST-1004',
        customerPhone: '+91 88888 99999',
        customerEmail: 'carol@example.com',
        productsCount: 3,
        totalAmount: 192,
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        status: 'Pending',
        assignedRider: null,
        deliveryAddress: 'Villa 5, Green Park, Mumbai',
        createdDate: '19 Feb 2026',
        deliveredDate: '-',
        items: [{ name: 'Amul Gold Milk 1L', productId: 'SKU-801', qty: 3, price: 64, image: 'https://placehold.co/40' }],
        productImage: 'https://placehold.co/40'
    }
];

const VendorOrdersPage = () => {
    const [orders, setOrders] = useState(INITIAL_MOCK_ORDERS);
    const [filters, setFilters] = useState({ search: '', status: '', paymentStatus: '', fromDate: '', toDate: '' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [assigningOrder, setAssigningOrder] = useState(null); // Can be a single order object or an array of IDs
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const searchMatch = !filters.search ||
                order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.customerName.toLowerCase().includes(filters.search.toLowerCase());

            const statusMatch = !filters.status || order.status === filters.status;

            const paymentMatch = !filters.paymentStatus ||
                (order.paymentStatus && order.paymentStatus.toLowerCase() === filters.paymentStatus.toLowerCase());

            return searchMatch && statusMatch && paymentMatch;
        });
    }, [orders, filters]);

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'Pending').length,
        assigned: orders.filter(o => o.status === 'Assigned').length,
        delivered: orders.filter(o => o.status === 'Delivered').length
    };

    const handleCreateOrder = (orderData, assignImmediately) => {
        const newOrder = {
            id: (1000 + orders.length + 1).toString(),
            customerName: orderData.customerName,
            customerId: `CUST-${1000 + orders.length + 1}`,
            customerPhone: orderData.customerPhone,
            customerEmail: 'customer@example.com', // Placeholder
            productsCount: orderData.items.length,
            totalAmount: orderData.finalTotal,
            paymentMethod: orderData.paymentType,
            paymentStatus: orderData.paymentType === 'Online' ? 'Paid' : 'Pending',
            status: 'Pending',
            assignedRider: null,
            deliveryAddress: orderData.deliveryAddress,
            createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            deliveredDate: '-',
            items: orderData.items,
            productImage: 'https://placehold.co/40'
        };

        setOrders([newOrder, ...orders]);
        setIsCreateModalOpen(false);
        showToast('Order created successfully!');

        if (assignImmediately) {
            setAssigningOrder(newOrder);
        }
    };

    const handleAssignRider = (rider) => {
        const targetIds = Array.isArray(assigningOrder)
            ? assigningOrder
            : [assigningOrder.id];

        setOrders(prev => prev.map(o =>
            targetIds.includes(o.id) ? { ...o, status: 'Assigned', assignedRider: rider.name } : o
        ));

        const message = targetIds.length > 1
            ? `${targetIds.length} orders assigned to ${rider.name}`
            : `Rider ${rider.name} assigned to order #${targetIds[0]}`;

        setAssigningOrder(null);
        setSelectedRows([]);
        showToast(message);
    };

    const handleBulkAssign = () => {
        const unassignedSelected = orders
            .filter(o => selectedRows.includes(o.id) && !o.assignedRider)
            .map(o => o.id);

        if (unassignedSelected.length === 0) {
            showToast('Please select unassigned orders first.', 'error');
            return;
        }

        setAssigningOrder(unassignedSelected);
    };

    return (
        <div className="vendor-orders-module management-module">
            {/* Header */}
            <div className="orders-header">
                <div>
                    <h1 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 800, color: '#0f172a' }}>Order Dispatch</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px', fontWeight: 500 }}>
                        {stats.pending} new orders waiting for rider assignment
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {selectedRows.length > 0 && (
                        <button
                            className="action-btn primary"
                            onClick={handleBulkAssign}
                            style={{ background: '#f59e0b' }}
                        >
                            <UserCheck size={18} /> Assign Selection ({selectedRows.length})
                        </button>
                    )}
                    <button className="action-btn secondary" onClick={() => setIsCreateModalOpen(true)}>
                        <Plus size={18} /> New Manual Order
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <VendorOrderStats stats={stats} />

            {/* Filters */}
            <VendorOrderFilters
                filters={filters}
                setFilters={setFilters}
                onClear={() => setFilters({ search: '', status: '', paymentStatus: '', fromDate: '', toDate: '' })}
                onExport={(type) => showToast(`Exporting orders as ${type.toUpperCase()}...`, 'info')}
            />

            {/* List */}
            <VendorOrderList
                orders={filteredOrders}
                selectedRows={selectedRows}
                onSelectRow={(id, checked) => checked ? setSelectedRows([...selectedRows, id]) : setSelectedRows(selectedRows.filter(r => r !== id))}
                onSelectAll={(checked) => setSelectedRows(checked ? filteredOrders.map(o => o.id) : [])}
                onView={(order) => showToast(`Viewing details for #${order.id}`, 'info')}
                onAssignRider={setAssigningOrder}
            />

            {/* Pagination Placeholder */}
            <div style={{ padding: '16px 24px', background: 'white', border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    Showing {filteredOrders.length} of {filteredOrders.length} orders
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="action-btn secondary" disabled style={{ padding: '6px 16px', fontSize: '0.8rem' }}>Previous</button>
                    <button className="action-btn secondary" disabled style={{ padding: '6px 16px', fontSize: '0.8rem' }}>Next</button>
                </div>
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <CreateVendorOrderModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleCreateOrder}
                />
            )}

            {assigningOrder && (
                <AssignRiderModal
                    order={assigningOrder}
                    onClose={() => setAssigningOrder(null)}
                    onAssign={handleAssignRider}
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

export default VendorOrdersPage;
