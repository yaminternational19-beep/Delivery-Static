import React from 'react';
import { Package, TrendingUp, AlertTriangle, XCircle } from 'lucide-react';

const VendorProductStats = ({ stats }) => {

    const data = stats || {
        total: 0,
        inStock: 0,
        lowStock: 0,
        outOfStock: 0
    };

    return (
        <div className="product-stats-panel">

            {/* Total Products */}
            <div className="stat-p-card">
                <div
                    className="stat-p-icon"
                    style={{ background: '#e0e7ff', color: '#4f46e5' }}
                >
                    <Package size={24} />
                </div>
                <div className="stat-p-info">
                    <h3>{data.total}</h3>
                    <p>Total Products</p>
                </div>
            </div>

            {/* In Stock */}
            <div className="stat-p-card">
                <div
                    className="stat-p-icon"
                    style={{ background: '#d1fae5', color: '#059669' }}
                >
                    <TrendingUp size={24} />
                </div>
                <div className="stat-p-info">
                    <h3>{data.inStock}</h3>
                    <p>In Stock</p>
                </div>
            </div>

            {/* Low Stock */}
            <div className="stat-p-card">
                <div
                    className="stat-p-icon"
                    style={{ background: '#fef3c7', color: '#d97706' }}
                >
                    <AlertTriangle size={24} />
                </div>
                <div className="stat-p-info">
                    <h3>{data.lowStock}</h3>
                    <p>Low Stock (&lt; 10)</p>
                </div>
            </div>

            {/* Out of Stock */}
            <div className="stat-p-card">
                <div
                    className="stat-p-icon"
                    style={{ background: '#fee2e2', color: '#dc2626' }}
                >
                    <XCircle size={24} />
                </div>
                <div className="stat-p-info">
                    <h3>{data.outOfStock}</h3>
                    <p>Out Of Stock</p>
                </div>
            </div>

        </div>
    );
};

export default VendorProductStats;
