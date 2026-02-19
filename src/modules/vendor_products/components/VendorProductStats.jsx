import React from 'react';
import { Package, Power, Clock, XCircle, CheckCircle2 } from 'lucide-react';

const VendorProductStats = ({ stats }) => {

    const data = stats || {
        total: 0,
        live: 0,
        pending: 0,
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
                    <Package size={26} />
                </div>
                <div className="stat-p-info">
                    <h3>{data.total}</h3>
                    <p>Total Catalog</p>
                </div>
            </div>

            {/* Live Products */}
            <div className="stat-p-card">
                <div
                    className="stat-p-icon"
                    style={{ background: '#dcfce7', color: '#15803d' }}
                >
                    <Power size={26} />
                </div>
                <div className="stat-p-info">
                    <h3>{data.live}</h3>
                    <p>Live Products</p>
                </div>
            </div>

            {/* Approval Pending */}
            <div className="stat-p-card">
                <div
                    className="stat-p-icon"
                    style={{ background: '#fffbeb', color: '#b45309' }}
                >
                    <Clock size={26} />
                </div>
                <div className="stat-p-info">
                    <h3>{data.pending}</h3>
                    <p>Awaiting Approval</p>
                </div>
            </div>

            {/* Out of Stock */}
            <div className="stat-p-card">
                <div
                    className="stat-p-icon"
                    style={{ background: '#fef2f2', color: '#b91c1c' }}
                >
                    <XCircle size={26} />
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
