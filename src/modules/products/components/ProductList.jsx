import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ProductList = ({ products, onAction, selectedRows, onSelectRow, onSelectAll }) => {
    // Determine if all rows are selected
    const allSelected = products.length > 0 && selectedRows.length === products.length;

    const handleSelectAll = (e) => {
        if (onSelectAll) {
            onSelectAll(e.target.checked);
        }
    };

    const handleSelectRow = (id, checked) => {
        if (onSelectRow) {
            onSelectRow(id, checked);
        }
    };

    // Helper for formatting currency
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const getStatusLabel = (product) => {
        if (product.rejectionReason) return 'Rejected';
        return product.isApproved ? 'Approved' : 'Pending';
    };

    const getStatusBadgeClass = (product) => {
        if (product.rejectionReason) return 'rejected';
        return product.isApproved ? 'approved' : 'pending';
    };

    if (!products || products.length === 0) {
        return (
            <div className="p-table-container" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                <p>No products found matching your filters.</p>
            </div>
        );
    }

    return (
        <div className="p-table-container" style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" style={{ minWidth: '1300px' }}>
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>
                            <input
                                type="checkbox"
                                className="checkbox-custom"
                                checked={allSelected}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th style={{ width: '80px' }}>IMAGE</th>
                        <th>PRODUCT ID / NAME</th>
                        <th>BRAND</th>
                        <th>VENDOR DETAILS</th>
                        <th>VENDOR CONTACT</th>
                        <th>CATEGORY</th>
                        <th>SUB CAT.</th>
                        <th>MRP</th>
                        <th style={{ whiteSpace: 'nowrap' }}>REQ. DATE</th>
                        <th style={{ whiteSpace: 'nowrap' }}>ACTION DATE</th>
                        <th style={{ textAlign: 'center' }}>STATUS</th>
                        <th style={{ textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className={selectedRows.includes(product.id) ? 'selected-row' : ''}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox-custom"
                                    checked={selectedRows.includes(product.id)}
                                    onChange={(e) => handleSelectRow(product.id, e.target.checked)}
                                />
                            </td>
                            <td>
                                <div className="product-img-preview" style={{
                                    backgroundImage: `url(${product.image || 'https://via.placeholder.com/48'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }} />
                            </td>
                            <td>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{product.itemId}</div>
                                <div style={{
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.3'
                                }}>
                                    {product.name}
                                </div>
                            </td>
                            <td>
                                <div style={{ fontWeight: 500, color: '#475569', fontSize: '0.85rem' }}>{product.brand}</div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>{product.vendorCompanyName}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{product.vendorName}</span>
                                </div>
                            </td>
                            <td>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                    <div>{product.vendorPhone}</div>
                                    <div style={{ color: '#94a3b8' }}>{product.vendorEmail}</div>
                                </div>
                            </td>
                            <td>
                                <span style={{
                                    background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px',
                                    fontSize: '0.7rem', color: '#475569', fontWeight: 600
                                }}>
                                    {product.category}
                                </span>
                            </td>
                            <td>
                                <span style={{
                                    background: '#eff6ff', padding: '2px 8px', borderRadius: '4px',
                                    fontSize: '0.7rem', color: '#3b82f6', fontWeight: 600
                                }}>
                                    {product.subCategory || 'N/A'}
                                </span>
                            </td>
                            <td style={{ fontWeight: 700, color: '#4f46e5', fontSize: '0.9rem' }}>
                                {formatCurrency(product.MRP)}
                            </td>
                            <td style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {product.raisedDate || '2024-03-01'}
                            </td>
                            <td style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {product.actionDate || '-'}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                                    <span className={`status-badge ${getStatusBadgeClass(product)}`}>
                                        {getStatusLabel(product)}
                                    </span>
                                    {product.rejectionReason && (
                                        <div style={{
                                            fontSize: '0.6rem',
                                            color: '#ef4444',
                                            fontStyle: 'italic',
                                            maxWidth: '120px'
                                        }}>
                                            {product.rejectionReason}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td>
                                <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                                    {!product.isApproved && !product.rejectionReason && (
                                        <>
                                            <button
                                                className="icon-btn"
                                                onClick={() => onAction('approve', product)}
                                                title="Approve"
                                                style={{ color: '#059669', background: '#ecfdf5' }}
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                            <button
                                                className="icon-btn"
                                                onClick={() => onAction('reject', product)}
                                                title="Reject"
                                                style={{ color: '#dc2626', background: '#fef2f2' }}
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
