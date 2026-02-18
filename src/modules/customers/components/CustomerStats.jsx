import React from 'react';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';

const CustomerStats = ({ stats }) => {
    const statCards = [
        { title: 'Total Customers', value: stats.total, icon: Users, color: '#6366f1', bg: '#eef2ff' },
        { title: 'Active Members', value: stats.active, icon: UserCheck, color: '#10b981', bg: '#ecfdf5' },
        { title: 'New Onboarded', value: stats.new, icon: UserPlus, color: '#f59e0b', bg: '#fffbeb' },
        { title: 'Requires Attention', value: stats.inactive, icon: UserX, color: '#ef4444', bg: '#fef2f2' }
    ];

    return (
        <div className="customer-stats-grid">
            {statCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <div key={idx} className="customer-stat-card">
                        <div className="customer-stat-icon" style={{ background: card.bg }}>
                            <Icon size={26} color={card.color} />
                        </div>
                        <div className="customer-stat-info">
                            <h3>{card.value}</h3>
                            <p>{card.title}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CustomerStats;
