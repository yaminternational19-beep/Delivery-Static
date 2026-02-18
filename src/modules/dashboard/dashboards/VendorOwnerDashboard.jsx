import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ShoppingBag,
    Package,
    CreditCard,
    AlertCircle,
    TrendingUp,
    Clock,
    Star,
    ChevronRight,
    ArrowLeft,
    MoreHorizontal,
    Edit3,
    Eye,
    CheckCircle
} from 'lucide-react';
import './VendorDashboard.css';

const StatCard = ({ title, value, subText, color, icon: Icon, trend }) => (
    <div className="vendor-card">
        <div className="vendor-stat-header">
            <div className="vendor-stat-title-group">
                <div style={{ color: color }}><Icon size={18} /></div>
                <span className="vendor-stat-title">{title}</span>
            </div>
            <MoreHorizontal size={14} color="#94a3b8" />
        </div>
        <div className="vendor-stat-value-group">
            <h3 className="vendor-stat-value">{value}</h3>
            {trend && <span className="vendor-stat-trend">{trend}</span>}
        </div>
        <p className="vendor-stat-subtext">{subText}</p>
    </div>
);

const userRole = localStorage.getItem('userRole');
const isSuperAdmin = userRole === 'SUPER_ADMIN';



const VendorOwnerDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const vendor = location.state?.vendor || { business: 'Vendor Dashboard', name: 'Partner' };

    return (
        <div className="vendor-dashboard">
            {isSuperAdmin && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <button
                            onClick={() => navigate('/vendors')}
                            className="icon-btn"
                            style={{
                                background: 'white',
                                border: '1px solid var(--border-color)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%'
                            }}
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', margin: 0 }}>{vendor.business}</h1>
                            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
                                Welcome back, {vendor.name}
                            </p>
                        </div>
                    </div>
                )}

            <div className="vendor-stats-grid">
                <StatCard title="Orders Today" value="32" trend="+8" subText="Total Orders - 24ms 2/25" color="#3b82f6" icon={ShoppingBag} />
                <StatCard title="Orders Pending" value="12" subText="Past Week: 84" color="#f59e0b" icon={Clock} />
                <StatCard title="Revenue Today" value="$480" trend="+3%" subText="Past Week: $7,520" color="#10b981" icon={CreditCard} />
                <StatCard title="Out of Stock" value="$18,750" trend="+3%" subText="Past Week: --" color="#06b6d4" icon={TrendingUp} />
                <StatCard title="Out of Stock" value="5" subText="Past Week: --" color="#ef4444" icon={AlertCircle} />
            </div>

            <div className="vendor-content-grid vendor-grid-2-1">
                <div className="vendor-card">
                    <div className="vendor-section-header">
                        <div>
                            <h4>Weekly Sales</h4>
                            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Revenue This Week: <strong>$1,120</strong> <span style={{ marginLeft: '20px' }}>Orders This Week: <strong>84 +</strong></span></p>
                        </div>
                        <span className="vendor-view-all">View All <ChevronRight size={14} /></span>
                    </div>
                    <div className="vendor-chart-placeholder">
                        Weekly Sales Chart Placeholder
                    </div>
                </div>

                <div className="vendor-card">
                    <div className="vendor-section-header">
                        <h4>Recent Orders</h4>
                        <span className="vendor-view-all">View All <ChevronRight size={14} /></span>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['#10211', '#10210', '#10209'].map((id, i) => (
                                    <tr key={id}>
                                        <td>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{id}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Apr 18, 2024, 10:15 AM</div>
                                        </td>
                                        <td>$36.50</td>
                                        <td><span className={`badge ${i === 0 ? 'pending' : i === 1 ? 'success' : 'pending'}`}>{i === 1 ? 'Delivered' : 'Pending'}</span></td>
                                        <td><button className="mini-btn view" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>View <ChevronRight size={12} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="vendor-content-grid vendor-grid-1-1">
                <div className="vendor-card">
                    <div className="vendor-section-header">
                        <h4>Low Stock Products</h4>
                        <span className="vendor-view-all">View All <ChevronRight size={14} /></span>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                        <table className="dashboard-table">
                            <tbody>
                                {[
                                    { name: 'Garlic Powder', stock: 3, status: '8 stated' },
                                    { name: 'Black Pepper', stock: 6, status: '5 stated' },
                                    { name: 'Oregano', stock: 4, status: '4 stated' },
                                    { name: 'Red Chilli Flakes', stock: 8, status: '4 stated' }
                                ].map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>
                                            <span className="vendor-stock-alert">
                                                <AlertCircle size={14} /> {item.stock}
                                            </span>
                                        </td>
                                        <td style={{ color: '#94a3b8' }}>{item.status}</td>
                                        <td><button className="mini-btn approve" style={{ background: '#10b981' }}>Restock</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="vendor-card">
                    <div className="vendor-section-header">
                        <h4>Ratings & Reviews</h4>
                        <MoreHorizontal size={18} color="#94a3b8" />
                    </div>
                    <div className="vendor-rating-container">
                        <div>
                            <h2 className="vendor-rating-big">4.9</h2>
                            <div className="vendor-stars">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#f59e0b" />)}
                            </div>
                            <p className="vendor-rating-count">6291 reviews</p>
                        </div>
                        <div className="vendor-rating-bars">
                            {[5, 4, 3, 2, 1].map(star => (
                                <div key={star} className="vendor-rating-bar-row">
                                    <span className="vendor-rating-label">{star}</span>
                                    <div className="vendor-rating-track">
                                        <div
                                            className="vendor-rating-fill"
                                            style={{
                                                background: star >= 4 ? '#10b981' : star >= 3 ? '#f59e0b' : '#ef4444',
                                                width: star === 5 ? '80%' : star === 4 ? '15%' : '5%'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="vendor-card">
                <div className="vendor-section-header">
                    <h4>Products Overview</h4>
                    <span className="vendor-view-all">View All <ChevronRight size={14} /></span>
                </div>
                <div style={{ padding: '0' }}>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Stock</th>
                                <th>Revenue</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Turmeric Powder', stock: 54, revenue: '2,310', status: 'Active' },
                                { name: 'Ground Cumin', stock: 88, revenue: '1,520', status: 'Active' }
                            ].map((prod, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="vendor-product-info">
                                            <div className="vendor-product-img"></div>
                                            <strong>{prod.name}</strong>
                                        </div>
                                    </td>
                                    <td><CheckCircle size={14} color="#10b981" style={{ marginRight: '8px' }} /> {prod.stock}</td>
                                    <td>${prod.revenue}</td>
                                    <td><span className="badge success">{prod.status}</span></td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="mini-btn view" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Edit3 size={12} /> Edit</button>
                                            <button className="mini-btn view" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={12} /> View</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};

export default VendorOwnerDashboard;
