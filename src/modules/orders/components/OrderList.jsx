import React from 'react';
import { Eye, UserMinus } from 'lucide-react';

const OrderList = ({ orders, onAction, selectedRows, onSelectRow, onSelectAll }) => {
    const allSelected = orders.length > 0 && selectedRows.length === orders.length;

    const handleSelectAll = (e) => {
        if (onSelectAll) {
            onSelectAll(e.target.checked);
        }
    };

    const handleSelectRow = (id, checked) => {
        if (onSelectRow) {
            onSelectRow(id, checked);
        }
    };

    if (!orders || orders.length === 0) {
        return (
            <div className="o-table-container" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                <p>No orders found matching your filters.</p>
            </div>
        );
    }

    return (
        <div className="o-table-container" style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" style={{ minWidth: '1400px' }}>
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>
                            <input
                                type="checkbox"
                                className="checkbox-custom"
                                checked={allSelected}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th>CUSTOMER ID</th>
                        <th>CUSTOMER NAME</th>
                        <th>PRODUCT ID / NAME</th>
                        <th>BRAND</th>
                        <th>VENDOR DETAILS</th>
                        <th>VENDOR CONTACT</th>
                        <th>CATEGORY / SUB</th>
                        <th style={{ textAlign: 'center' }}>STATUS</th>
                        <th>ORDERED DATE</th>
                        <th>DELIVERED DATE</th>
                        <th>RIDER CONTACT</th>
                        <th style={{ textAlign: 'right' }}>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className={selectedRows.includes(order.id) ? 'selected-row' : ''}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox-custom"
                                    checked={selectedRows.includes(order.id)}
                                    onChange={(e) => handleSelectRow(order.id, e.target.checked)}
                                />
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                                {order.customerId}
                            </td>
                            <td>
                                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{order.customerName}</div>
                            </td>
                            <td>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{order.itemId}</div>
                                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{order.itemName}</div>
                            </td>
                            <td>
                                <div style={{ fontWeight: 500, color: '#475569', fontSize: '0.85rem' }}>{order.brand}</div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>{order.vendorCompanyName}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{order.vendorName}</span>
                                </div>
                            </td>
                            <td>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                    <div>{order.vendorPhone || '+91 90000 00000'}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{order.vendorEmail || 'vendor@example.com'}</div>
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{
                                        background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px',
                                        fontSize: '0.7rem', color: '#475569', fontWeight: 600, width: 'fit-content'
                                    }}>
                                        {order.category}
                                    </span>
                                    <span style={{ fontSize: '0.7rem', color: '#64748b', paddingLeft: '4px' }}>
                                        {order.subCategory || '-'}
                                    </span>
                                </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                {order.orderedDate || 'N/A'}
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                {order.deliveredDate || '---'}
                            </td>
                            <td style={{ fontSize: '0.85rem' }}>
                                <div style={{ fontWeight: 500, color: '#334155', fontSize: '0.85rem' }}>{order.riderContact}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{order.riderEmail}</div>
                            </td>
                            <td>
                                <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                                    <button
                                        className="icon-btn"
                                        onClick={() => onAction('view', order)}
                                        title="View Rider Dashboard"
                                        style={{ color: '#4f46e5', background: '#eef2ff' }}
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button
                                        className="icon-btn"
                                        onClick={() => onAction('terminate', order)}
                                        title="Terminate / Deactivate Rider"
                                        style={{ color: '#dc2626', background: '#fef2f2' }}
                                    >
                                        <UserMinus size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
