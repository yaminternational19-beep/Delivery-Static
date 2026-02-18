import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, ShoppingBag, Star, Clock, UserX, CheckCircle, Ban } from 'lucide-react';

const CustomerProfileModal = ({ customer, onClose, onTerminate, onBlock, onActivate }) => {
    if (!customer) return null;

    // Mock order history for the demo
    const mockOrders = [
        { id: 'ORD-5521', date: '15 Feb 2026', amount: '$42.50', status: 'Delivered', items: '2 Items' },
        { id: 'ORD-5489', date: '12 Feb 2026', amount: '$18.20', status: 'Delivered', items: '1 Item' },
        { id: 'ORD-5310', date: '01 Feb 2026', amount: '$65.00', status: 'Cancelled', items: '4 Items' },
    ];

    return (
        <div className="modal-overlay">
            <div className="customer-view-modal">
                <div className="modal-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="profile-large-avatar">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>{customer.name}</h2>
                            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontWeight: 500 }}>Customer ID: {customer.id}</p>
                        </div>
                    </div>
                    <button className="icon-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <div className="modal-body">
                    <div className="profile-grid">
                        <div className="profile-left">
                            <h3 className="section-title">Personal Details</h3>
                            <div className="detail-item"><Phone size={18} /> {customer.phone}</div>
                            <div className="detail-item"><Mail size={18} /> {customer.email}</div>
                            <div className="detail-item"><MapPin size={18} /> {customer.city}, {customer.country}</div>
                            <div className="detail-item"><Calendar size={18} /> Joined {customer.joined}</div>

                            <div style={{ marginTop: '32px' }}>
                                <h3 className="section-title">Account Status</h3>
                                <span className={`badge ${customer.status === 'Active' ? 'success' : customer.status === 'Terminated' ? 'error' : 'warning'}`}>
                                    {customer.status}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '40px' }}>
                                {customer.status === 'Terminated' ? (
                                    <button
                                        className="action-btn primary"
                                        style={{ width: '100%', justifyContent: 'center', background: '#10b981' }}
                                        onClick={() => {
                                            onActivate(customer.id);
                                            onClose();
                                        }}
                                    >
                                        <CheckCircle size={18} /> Activate Account
                                    </button>
                                ) : (
                                    <>
                                        {customer.status === 'Blocked' ? (
                                            <button
                                                className="action-btn"
                                                style={{ width: '100%', justifyContent: 'center', background: '#f59e0b', color: 'white' }}
                                                onClick={() => {
                                                    onActivate(customer.id); // Re-use activate for unblocking
                                                    onClose();
                                                }}
                                            >
                                                <CheckCircle size={18} /> Unblock Account
                                            </button>
                                        ) : (
                                            <button
                                                className="action-btn"
                                                style={{ width: '100%', justifyContent: 'center', background: '#f59e0b', color: 'white' }}
                                                onClick={() => {
                                                    onBlock(customer.id);
                                                    onClose();
                                                }}
                                            >
                                                <Ban size={18} /> Block Account
                                            </button>
                                        )}
                                        <button
                                            className="action-btn error-light"
                                            style={{ width: '100%', justifyContent: 'center' }}
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to terminate customer ${customer.name}?`)) {
                                                    onTerminate(customer.id);
                                                    onClose();
                                                }
                                            }}
                                        >
                                            <UserX size={18} /> Terminate Account
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="profile-right">
                            <h3 className="section-title">Activity Overview</h3>
                            <div className="stats-mini-grid">
                                <div className="stat-card-small">
                                    <div style={{ background: '#eef2ff', padding: '10px', borderRadius: '12px', color: '#6366f1' }}>
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div>
                                        <div className="stat-val">{customer.totalOrders}</div>
                                        <div className="stat-lbl">Total Orders</div>
                                    </div>
                                </div>
                                <div className="stat-card-small">
                                    <div style={{ background: '#fffbeb', padding: '10px', borderRadius: '12px', color: '#f59e0b' }}>
                                        <Star size={20} />
                                    </div>
                                    <div>
                                        <div className="stat-val">4.8</div>
                                        <div className="stat-lbl">Rating</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 className="section-title" style={{ margin: 0 }}>Recent Orders</h3>
                                    <button className="text-btn primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>View All</button>
                                </div>
                                <div className="order-history-table">
                                    <table className="dashboard-table sm">
                                        <thead style={{ background: '#f8fafc' }}>
                                            <tr>
                                                <th>ORDER ID</th>
                                                <th>DATE</th>
                                                <th>ITEMS</th>
                                                <th>AMOUNT</th>
                                                <th>STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>{order.id}</td>
                                                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{order.date}</td>
                                                    <td style={{ fontSize: '0.8rem' }}>{order.items}</td>
                                                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>{order.amount}</td>
                                                    <td>
                                                        <span className={`badge ${order.status === 'Delivered' ? 'success' : 'error'}`} style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfileModal;
