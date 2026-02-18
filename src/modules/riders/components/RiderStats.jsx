import React from 'react';
import { Truck, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const RiderStats = ({ stats }) => {
    const statCards = [
        {
            title: 'Total Riders',
            value: stats.total,
            icon: Truck,
            color: '#6366f1',
            bg: '#eef2ff',
            desc: 'Registered fleet size'
        },
        {
            title: 'Verified Riders',
            value: stats.verified,
            icon: ShieldCheck,
            color: '#10b981',
            bg: '#ecfdf5',
            desc: 'KYC approved'
        },
        {
            title: 'Pending KYC',
            value: stats.pending,
            icon: Clock,
            color: '#f59e0b',
            bg: '#fffbeb',
            desc: 'Waiting for verification'
        },
        {
            title: 'Rejected/Issues',
            value: stats.rejected,
            icon: AlertCircle,
            color: '#ef4444',
            bg: '#fef2f2',
            desc: 'Requires attention'
        }
    ];

    return (
        <div className="rider-stats-grid">
            {statCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <div key={idx} className="rider-stat-card">
                        <div className="rider-stat-icon" style={{ background: card.bg }}>
                            <Icon size={28} color={card.color} />
                        </div>
                        <div className="rider-stat-info">
                            <h3>{card.value}</h3>
                            <p>{card.title}</p>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{card.desc}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RiderStats;
