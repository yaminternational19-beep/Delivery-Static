import React from 'react';
import {
    ShoppingBag,
    Truck,
    TrendingUp,
    AlertCircle,
    CreditCard,
    BarChart3,
    CheckCircle,
    Clock,
    Search,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from 'lucide-react';

const StatCard = ({ title, value, trend, color, isCurrency }) => (
    <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{title}</span>
            <MoreHorizontal size={14} color="#94a3b8" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{isCurrency ? `$${value}` : value}</h3>
            <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: trend.startsWith('+') ? '#10b981' : '#ef4444',
                display: 'flex',
                alignItems: 'center'
            }}>
                {trend}
                {trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            </span>
        </div>
        <div style={{ height: '40px', marginTop: '12px', background: `${color}10`, borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', background: color, opacity: 0.2, clipPath: 'polygon(0 100%, 20% 80%, 40% 90%, 60% 70%, 80% 85%, 100% 60%, 100% 100%)' }}></div>
        </div>
    </div>
);

const FunnelStep = ({ label, value, width, color }) => (
    <div className="funnel-item">
        <div className="funnel-bar" style={{ width: `${width}%`, background: color }}></div>
        <span className="funnel-label">{label}</span>
        <span className="funnel-meta">{value} Days</span>
    </div>
);

const SuperAdminDashboard = () => (
    <div className="dashboard-content">
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            <StatCard title="Total Orders" value="8,450" trend="+12%" color="#3b82f6" />
            <StatCard title="Delivered Orders" value="7,820" trend="+10%" color="#10b981" />
            <StatCard title="Cancelled Orders" value="320" trend="-8%" color="#ef4444" />
            <StatCard title="Total GMV" value="245,830" trend="+15%" color="#8b5cf6" isCurrency />
            <StatCard title="Platform Revenue" value="18,750" trend="+9%" color="#f59e0b" isCurrency />
            <StatCard title="Avg Delivery Time" value="32" trend="-5%" color="#06b6d4" />
            <StatCard title="SLA Breach" value="8.2%" trend="-2%" color="#f43f5e" />
        </div>

        <div className="content-grid" style={{ marginTop: '24px', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>Order Status Overview</h4>
                    <MoreHorizontal size={18} color="#94a3b8" />
                </div>
                <div className="funnel-container">
                    <FunnelStep label="Placed" value="43" width={100} color="#3b82f6" />
                    <FunnelStep label="Confirmed" value="37" width={85} color="#6366f1" />
                    <FunnelStep label="Packed" value="21" width={70} color="#8b5cf6" />
                    <FunnelStep label="Out for Delivery" value="28" width={55} color="#a855f7" />
                    <FunnelStep label="Delivered" value="24" width={40} color="#d946ef" />
                    <FunnelStep label="Cancelled / Refunded" value="18" width={30} color="#f43f5e" />
                </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>Live Alerts</h4>
                    <span style={{ fontSize: '0.8rem', color: '#6366f1', cursor: 'pointer', fontWeight: 600 }}>View All <ChevronRight size={14} style={{ display: 'inline' }} /></span>
                </div>
                <div style={{ marginTop: '16px' }}>
                    {[
                        { msg: 'High cancellation rate for Vendor X', type: 'red' },
                        { msg: 'Payment gateway errors detected', type: 'orange' },
                        { msg: 'Zone B SLA breach exceeds 25%', type: 'green' },
                        { msg: 'Product Y Flagged for high refunds', type: 'orange' }
                    ].map((alert, i) => (
                        <div key={i} className="alert-item">
                            <div className={`alert-dot ${alert.type}`}></div>
                            <span style={{ flex: 1 }}>{alert.msg}</span>
                            <ChevronRight size={14} color="#94a3b8" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div style={{ marginTop: '24px' }} className="card">
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Action Queue</h4>
                    <div className="tab-container" style={{ margin: 0, border: 'none', padding: 0 }}>
                        <div className="tab-item active">Vendor Approvals (8)</div>
                        <div className="tab-item">Product Approvals (5)</div>
                        <div className="tab-item">Refund Requests (4)</div>
                    </div>
                </div>
                <MoreHorizontal size={18} color="#94a3b8" />
            </div>
            <div style={{ padding: '0 20px 20px' }}>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Entity</th>
                            <th>Type</th>
                            <th>Age</th>
                            <th>Priority</th>
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: 'SpiceMart', type: 'Repr', age: '12 Days', priority: 'High', color: 'red' },
                            { name: 'ManiMia', type: 'Server', age: '17 Days', priority: 'High', color: 'red' }
                        ].map((row, i) => (
                            <tr key={i}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9' }}></div>
                                        <strong>{row.name}</strong>
                                    </div>
                                </td>
                                <td><CheckCircle size={14} color="#10b981" style={{ marginRight: '8px' }} /> {row.type}</td>
                                <td>{row.age}</td>
                                <td><span className={`priority-dot priority-${row.color}`}></span> {row.priority}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0' }}></div>
                                        <div style={{ width: '60px', height: '8px', background: '#f1f5f9', borderRadius: '4px' }}></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="action-btns">
                                        <button className="mini-btn approve">Approve</button>
                                        <button className="mini-btn reject">Reject</button>
                                        <button className="mini-btn view">View</button>
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

export default SuperAdminDashboard;
