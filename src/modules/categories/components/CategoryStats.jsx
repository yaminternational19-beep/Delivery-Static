import React from 'react';
import { Layers, CheckCircle, Star, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CategoryStats = () => {
    const stats = [
        {
            title: 'Total Categories',
            value: '24',
            trend: '+4',
            icon: Layers,
            color: '#6366f1',
            subText: 'Across all vendors'
        },
        {
            title: 'Active Categories',
            value: '18',
            trend: '+2',
            icon: CheckCircle,
            color: '#10b981',
            subText: 'Currently live'
        },
        {
            title: 'Top Category',
            value: 'Spices',
            trend: '+12%',
            icon: Star,
            color: '#f59e0b',
            subText: 'Most revenue'
        },
        {
            title: 'Total Products',
            value: '1,240',
            trend: '+56',
            icon: Package,
            color: '#06b6d4',
            subText: 'Listed items'
        }
    ];

    return (
        <div className="category-stats-panel">
            {stats.map((stat, i) => (
                <div key={i} className="stat-c-card">
                    <div className="stat-c-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                        <stat.icon size={24} />
                    </div>
                    <div className="stat-c-info">
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
                        <p>{stat.subText}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryStats;
