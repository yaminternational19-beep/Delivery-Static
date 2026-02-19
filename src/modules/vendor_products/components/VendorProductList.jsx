import React from 'react';

const VendorProductList = ({
    products,
    selectedRows,
    onSelectRow,
    onSelectAll
}) => {

    const allSelected =
        products.length > 0 &&
        selectedRows.length === products.length;

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
            <div className="p-table-container" style={{ padding: 40, textAlign: 'center' }}>
                No products found.
            </div>
        );
    }

    return (
        <div className="p-table-container" style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" style={{ minWidth: '1100px' }}>
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => onSelectAll(e.target.checked)}
                            />
                        </th>
                        <th style={{ width: '80px' }}>IMAGE</th>
                        <th>PRODUCT ID</th>
                        <th>PRODUCT NAME</th>
                        <th>BRAND</th>
                        <th>CATEGORY</th>
                        <th>SUB CATEGORY</th>
                        <th>MRP</th>
                        <th> STOCK </th>
                        <th>CREATED DATE</th>
                        <th style={{ textAlign: 'center' }}>STATUS</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
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
                                        backgroundImage: `url(${product.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            </td>

                            <td>{product.itemId}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.subCategory}</td>
                            <td style={{ fontWeight: 600 }}>
                                {formatCurrency(product.MRP)}
                            </td>
                            <td>{product.stock}</td>
                            <td>{product.createdAt}</td>


                            <td style={{ textAlign: 'center' }}>
                                <span className={`status-badge ${getStatusBadgeClass(product)}`}>
                                    {getStatusLabel(product)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VendorProductList;
