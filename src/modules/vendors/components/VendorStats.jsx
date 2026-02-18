import React from 'react';
import { Users, TrendingUp, FileText, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const VendorStats = () => {
    const stats = [
        {
            title: 'Total Vendors',
            value: '142',
            trend: '+12%',
            icon: Users,
            color: '#6366f1',
            subText: '24 new this month'
        },
        {
            title: 'Avg. Turnover',
            value: '$12.4k',
            trend: '+8.2%',
            icon: TrendingUp,
            color: '#10b981',
            subText: 'Per vendor / month'
        },
        {
            title: 'Pending Apps',
            value: '18',
            trend: '-2',
            icon: FileText,
            color: '#f59e0b',
            subText: 'Awaiting approval'
        },
        {
            title: 'KYC Verified',
            value: '94%',
            trend: '+5%',
            icon: ShieldCheck,
            color: '#06b6d4',
            subText: 'System health'
        }
    ];

    return (
        <div className="vendor-stats-panel">
            {stats.map((stat, i) => (
                <div key={i} className="stat-v-card">
                    <div className="stat-v-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                        <stat.icon size={24} />
                    </div>
                    <div className="stat-v-info">
                        <p>{stat.title}</p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <h3>{stat.value}</h3>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: stat.trend.startsWith('+') ? '#10b981' : '#ef4444',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {stat.trend}
                                {stat.trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            </span>
                        </div>
                        <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>{stat.subText}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VendorStats;
