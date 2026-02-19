
import React from 'react';
import { Eye, UserCheck, AlertCircle } from 'lucide-react';

const VendorOrderList = ({ orders, selectedRows, onSelectRow, onSelectAll, onView, onAssignRider }) => {

    const allSelected = orders.length > 0 && selectedRows.length === orders.length;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusBadge = (status) => {
        const s = status.toLowerCase();
        return <span className={`status-badge ${s}`}>{status}</span>;
    };

    if (!orders || orders.length === 0) {
        return (
            <div className="o-table-container" style={{ padding: '60px', textAlign: 'center' }}>
                <AlertCircle size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
                <p style={{ color: '#64748b', fontWeight: 500 }}>No orders found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="o-table-container">
            <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
                <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '16px 20px', textAlign: 'left', width: '40px' }}>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => onSelectAll(e.target.checked)}
                            />
                        </th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ORDER ID</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>CUSTOMER</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ITEMS</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>TOTAL AMOUNT</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>PAYMENT</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>STATUS</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>RIDER</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ADDRESS</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>CREATED DATE</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="table-row-hover">
                            <td style={{ padding: '16px 20px' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(order.id)}
                                    onChange={(e) => onSelectRow(order.id, e.target.checked)}
                                />
                            </td>
                            <td style={{ padding: '16px 20px', fontWeight: 700, color: '#1e293b' }}>#{order.id}</td>
                            <td style={{ padding: '16px 20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, color: '#334155' }}>{order.customerName}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{order.customerPhone}</span>
                                </div>
                            </td>
                            <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 600 }}>{order.productsCount}</td>
                            <td style={{ padding: '16px 20px', fontWeight: 700, color: '#4f46e5' }}>{formatCurrency(order.totalAmount)}</td>
                            <td style={{ padding: '16px 20px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>{order.paymentMethod}</span>
                            </td>
                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                {getStatusBadge(order.status)}
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                                {order.assignedRider ? (
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                                            {order.assignedRider.charAt(0)}
                                        </div>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{order.assignedRider}</span>
                                    </div>
                                ) : (
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>Unassigned</span>
                                )}
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                                <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={order.deliveryAddress}>
                                    {order.deliveryAddress}
                                </span>
                            </td>
                            <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: '#64748b' }}>{order.createdDate}</td>
                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                                    <button
                                        onClick={() => onView(order)}
                                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        title="View Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    {!order.assignedRider ? (
                                        <button
                                            onClick={() => onAssignRider(order)}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                border: '1px solid #f59e0b',
                                                background: '#fffbeb',
                                                color: '#b45309',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            className="assign-btn-hover"
                                        >
                                            <UserCheck size={14} />
                                            Assign Rider
                                        </button>
                                    ) : (
                                        <div style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                            Done
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style>{`
                .table-row-hover:hover { background: #f8fafc; }
            `}</style>
        </div>
    );
};

export default VendorOrderList;
