import React from 'react';
import { ShoppingBag, Users, Package, Headphones, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
        <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: `${color}15`, color: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {icon}
        </div>
        <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, margin: 0 }}>{title}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <h3 style={{ fontSize: '1.5rem', margin: '4px 0 0 0' }}>{value}</h3>
                {trend && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>{trend}</span>}
            </div>
        </div>
    </div>
);

const AdminDashboard = () => (
    <div className="dashboard-content">
        <div className="stats-grid">
            <StatCard title="Active Vendors" value="48" icon={<ShoppingBag size={24} />} color="#6366f1" trend="+4" />
            <StatCard title="Total Customers" value="1,240" icon={<Users size={24} />} color="#10b981" trend="+12%" />
            <StatCard title="Pending Approvals" value="12" icon={<Package size={24} />} color="#f59e0b" />
            <StatCard title="Open Tickets" value="5" icon={<Headphones size={24} />} color="#ef4444" />
        </div>

        <div className="content-grid" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '24px' }}>
                <h4>Vendor Performance</h4>
                <div style={{ marginTop: '20px' }}>
                    {/* Mock content */}
                    <div style={{ height: '150px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                        Performance Chart Placeholder
                    </div>
                </div>
            </div>
            <div className="card" style={{ padding: '24px' }}>
                <h4>Quick Actions</h4>
                <div style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
                    <button className="action-btn primary">Add New Vendor</button>
                    <button className="action-btn secondary">Broadcast Message</button>
                    <button className="action-btn secondary">System Report</button>
                </div>
            </div>
        </div>
    </div>
);

export default AdminDashboard;
