import React from 'react';
import { Eye, Edit3, Power, AlertTriangle } from 'lucide-react';

const VendorProductList = ({
    products,
    selectedRows,
    onSelectRow,
    onSelectAll,
    onView,
    onEdit,
    onToggleStatus
}) => {

    const allSelected =
        products.length > 0 &&
        selectedRows.length === products.length;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getApprovalStatus = (product) => {
        if (product.rejectionReason) return { label: 'Rejected', class: 'rejected' };
        if (product.isApproved) return { label: 'Approved', class: 'approved' };
        return { label: 'Pending', class: 'pending' };
    };

    const getStockStatus = (stock) => {
        const val = Number(stock) || 0;
        if (val === 0) return { label: 'Out of Stock', class: 'stock-out' };
        if (val <= 5) return { label: `${val} Low`, class: 'stock-low' };
        return { label: `${val} In Stock`, class: 'stock-ok' };
    };

    if (!products || products.length === 0) {
        return (
            <div className="p-table-container" style={{ padding: 60, textAlign: 'center', background: '#fff' }}>
                <AlertTriangle size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div className="product-list-wrapper">
            <div className="p-table-container">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40px', padding: '16px' }}>
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={(e) => onSelectAll(e.target.checked)}
                                />
                            </th>
                            <th style={{ width: '80px', whiteSpace: 'nowrap' }}>IMAGE</th>
                            <th style={{ whiteSpace: 'nowrap' }}>PRODUCT ID</th>
                            <th style={{ minWidth: '200px', whiteSpace: 'nowrap' }}>PRODUCT NAME</th>
                            <th style={{ whiteSpace: 'nowrap' }}>CATEGORY</th>
                            <th style={{ whiteSpace: 'nowrap' }}>SUB CATEGORY</th>
                            <th style={{ whiteSpace: 'nowrap' }}>BRAND</th>
                            <th style={{ whiteSpace: 'nowrap' }}>MRP</th>
                            <th style={{ whiteSpace: 'nowrap' }}>SALE PRICE</th>
                            <th style={{ whiteSpace: 'nowrap' }}>STOCK</th>
                            <th style={{ whiteSpace: 'nowrap' }}>MFG DATE</th>
                            <th style={{ whiteSpace: 'nowrap' }}>EXP DATE</th>
                            <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>LIVE STATUS</th>
                            <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>APPROVAL</th>
                            <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => {
                            const approval = getApprovalStatus(product);
                            const stockStatus = getStockStatus(product.stock);

                            return (
                                <tr key={product.id}>
                                    <td style={{ padding: '16px' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(product.id)}
                                            onChange={(e) =>
                                                onSelectRow(product.id, e.target.checked)
                                            }
                                        />
                                    </td>

                                    <td>
                                        <div
                                            className="product-img-preview"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '8px',
                                                backgroundImage: `url(${product.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                border: '1px solid #e2e8f0'
                                            }}
                                        />
                                    </td>

                                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>#{product.itemId || 'N/A'}</td>
                                    <td style={{ minWidth: '200px' }}>
                                        <div className="product-name-clamp">
                                            {product.name}
                                        </div>
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{product.category}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{product.subCategory || '--'}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{product.brand || '--'}</td>
                                    <td style={{ color: '#94a3b8', textDecoration: 'line-through', whiteSpace: 'nowrap' }}>
                                        {formatCurrency(product.price || product.MRP)}
                                    </td>
                                    <td style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                                        {formatCurrency(product.salePrice)}
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <span className={`stock-status-badge ${stockStatus.class}`}>
                                            {stockStatus.label}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{product.manufactureDate || '--'}</td>
                                    <td style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{product.expiryDate || '--'}</td>

                                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                        <div className={`status-pill ${product.isActive ? 'active' : 'inactive'}`}>
                                            <span className="dot"></span>
                                            {product.isActive ? 'Live' : 'Hidden'}
                                        </div>
                                    </td>

                                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                        <span className={`status-badge ${approval.class}`}>
                                            {approval.label}
                                        </span>
                                    </td>

                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button className="action-icon-btn view" onClick={() => onView?.(product)} title="View">
                                                <Eye size={16} />
                                            </button>
                                            <button className="action-icon-btn edit" onClick={() => onEdit?.(product)} title="Edit">
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                className={`action-icon-btn status ${product.isActive ? 'active' : 'inactive'}`}
                                                onClick={() => onToggleStatus?.(product.id)}
                                                title={product.isActive ? 'Deactivate' : 'Activate'}
                                            >
                                                <Power size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <style>{`
                .p-table-container {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 transparent;
                }
                .p-table-container::-webkit-scrollbar {
                    height: 8px;
                }
                .p-table-container::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 10px;
                }

                .product-name-clamp {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: 0.9rem;
                    line-height: 1.4;
                    font-weight: 500;
                    color: #1e293b;
                    max-width: 250px;
                }
                
                .stock-status-badge {
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    display: inline-block;
                }
                .stock-ok { background: #dcfce7; color: #166534; }
                .stock-low { background: #ffedd5; color: #9a3412; }
                .stock-out { background: #fee2e2; color: #991b1b; }

                .status-badge {
                    padding: 4px 12px;
                    border-radius: 999px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .status-badge.approved { background: #ecfdf5; color: #10b981; border: 1px solid #10b981; }
                .status-badge.pending { background: #fffbeb; color: #f59e0b; border: 1px solid #f59e0b; }
                .status-badge.rejected { background: #fef2f2; color: #ef4444; border: 1px solid #ef4444; }

                .status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px;
                    border-radius: 99px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .status-pill .dot { width: 6px; height: 6px; border-radius: 50%; }
                .status-pill.active { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
                .status-pill.active .dot { background: #16a34a; box-shadow: 0 0 4px #16a34a; }
                .status-pill.inactive { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
                .status-pill.inactive .dot { background: #94a3b8; }

                .action-icon-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .action-icon-btn:hover {
                    background: #f8fafc;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                }
                .action-icon-btn.view:hover { color: #6366f1; border-color: #6366f1; }
                .action-icon-btn.edit:hover { color: #f59e0b; border-color: #f59e0b; }
                .action-icon-btn.status.active { color: #10b981; }
                .action-icon-btn.status.inactive { color: #94a3b8; }
                .action-icon-btn.status:hover { border-color: currentColor; }
            `}</style>
        </div>
    );
};

export default VendorProductList;
