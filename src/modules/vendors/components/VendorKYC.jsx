import React, { useState } from 'react';
import {
    FileText,
    CheckCircle,
    XCircle,
    Eye,
    Clock,
    ShieldCheck,
    Download,
    AlertCircle,
    Search
} from 'lucide-react';

const VendorKYC = ({ showToast }) => {
    const [kycRequests, setKycRequests] = useState([
        // ... (data remains the same)
        {
            id: 'KYC-1001',
            vendorName: 'Organic Harvest Co',
            companyId: 'V-8821',
            submittedDate: '2026-02-15',
            status: 'Pending',
            ownerName: 'Rahul Sharma',
            category: 'Grocery',
            email: 'rahul@organicharvest.com',
            mobile: '+91 98765 43210',
            emergencyMobile: '+91 87654 32109',
            address: 'Plot 45, Industrial Area Phase II',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India',
            pincode: '560001',
            bankDetails: {
                bankName: 'HDFC Bank',
                accountName: 'Organic Harvest Co',
                accountNumber: '50100223344556',
                ifsc: 'HDFC0001234'
            },
            documents: [
                { type: 'GST Certificate', id: 'GST-9921-X', file: 'gst_cert.pdf', status: 'verified' },
                { type: 'PAN Card', id: 'AYYPB1234F', file: 'pan_card.jpg', status: 'verified' },
                { type: 'Address Proof', id: 'ADD-5521', file: 'utility_bill.pdf', status: 'pending' },
                { type: 'Trade license', id: 'TL-7721', file: 'trade_license.pdf', status: 'pending' }
            ]
        },
        {
            id: 'KYC-1002',
            vendorName: 'ElectroHub Retail',
            companyId: 'V-9902',
            submittedDate: '2026-02-16',
            status: 'Pending',
            ownerName: 'Sanjay Gupta',
            category: 'Electronics',
            email: 'contact@electrohub.in',
            mobile: '+91 91234 56789',
            emergencyMobile: '+91 90000 11111',
            address: 'Shop No 12, MG Road Plaza',
            city: 'Pune',
            state: 'Maharashtra',
            country: 'India',
            pincode: '411001',
            bankDetails: {
                bankName: 'ICICI Bank',
                accountName: 'ElectroHub Retail',
                accountNumber: '100200300400',
                ifsc: 'ICIC0005566'
            },
            documents: [
                { type: 'GST Certificate', id: 'GST-7721-P', file: 'gst_cert_electro.pdf', status: 'verified' },
                { type: 'PAN Card', id: 'BPPPB5678G', file: 'pan_electro.png', status: 'verified' },
                { type: 'Address Proof', id: 'ADD-9902', file: 'rent_agreement.pdf', status: 'verified' }
            ]
        },
        {
            id: 'KYC-1003',
            vendorName: 'Fashion Forward',
            companyId: 'V-4412',
            submittedDate: '2026-02-14',
            status: 'Rejected',
            rejectionReason: 'Blurred PAN card image',
            ownerName: 'Anjali Verma',
            category: 'Fashion',
            email: 'admin@fashionforward.com',
            mobile: '+91 98888 77777',
            emergencyMobile: '+91 97777 66666',
            address: 'Suite 201, Crystal Tower',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India',
            pincode: '400001',
            bankDetails: {
                bankName: 'Axis Bank',
                accountName: 'Fashion Forward',
                accountNumber: '912010055566677',
                ifsc: 'UTIB0001122'
            },
            documents: [
                { type: 'GST Certificate', id: 'GST-1102-K', file: 'fashion_gst.pdf', status: 'verified' },
                { type: 'PAN Card', id: 'CPPPC9012H', file: 'fashion_pan.jpg', status: 'rejected' }
            ]
        }
    ]);

    const [selectedRequest, setSelectedRequest] = useState(kycRequests[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredRequests = React.useMemo(() => {
        return kycRequests.filter(req => {
            const matchesSearch = req.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.companyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [kycRequests, searchQuery, statusFilter]);

    const handleApprove = (id) => {
        setKycRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: 'Approved' } : req
        ));
        showToast(`KYC for ${selectedRequest.vendorName} approved successfully!`, 'success');
        setSelectedRequest(null);
    };

    const handleReject = (id) => {
        const reason = prompt('Enter rejection reason:');
        if (reason) {
            setKycRequests(prev => prev.map(req =>
                req.id === id ? { ...req, status: 'Rejected', rejectionReason: reason } : req
            ));
            showToast(`KYC for ${selectedRequest.vendorName} rejected.`, 'error');
            setSelectedRequest(null);
        }
    };

    return (
        <div className="kyc-container">
            <div className="kyc-verification-grid">
                {/* Left Panel: List of Requests */}
                <div className="card kyc-list-card">
                    <div className="v-table-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="kyc-title">Verification Requests</h3>
                            <div className="badge-group">
                                <span className="status-badge pending">
                                    {kycRequests.filter(r => r.status === 'Pending').length} Pending
                                </span>
                            </div>
                        </div>

                        <div className="kyc-filters" style={{ display: 'flex', gap: '10px' }}>
                            <div className="v-search" style={{ flex: 1 }}>
                                <Search className="search-icon" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search vendor or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ height: '36px', fontSize: '0.85rem' }}
                                />
                            </div>
                            <select
                                className="v-filter-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    padding: '0 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#475569',
                                    outline: 'none'
                                }}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="kyc-list-scroll">
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className={`kyc-list-item ${selectedRequest?.id === request.id ? 'active' : ''}`}
                                    onClick={() => setSelectedRequest(request)}
                                >
                                    <div className="kyc-header-flex">
                                        <div>
                                            <div className="kyc-item-name">{request.vendorName}</div>
                                            <div className="kyc-item-meta">
                                                ID: {request.companyId} • {request.submittedDate}
                                            </div>
                                        </div>
                                        <span className={`status-badge ${request.status.toLowerCase()}`}>
                                            {request.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8' }}>
                                <AlertCircle size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                                <p>No matching requests found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Details and Actions */}
                <div className="kyc-details-panel">
                    {selectedRequest ? (
                        <div className="card kyc-details-card">
                            <div className="kyc-details-header">
                                <div className="kyc-header-flex">
                                    <div>
                                        <h3 className="kyc-details-title">{selectedRequest.vendorName}</h3>
                                        <div className="kyc-header-meta">
                                            <span>ID: {selectedRequest.companyId}</span>
                                            <span>|</span>
                                            <span>Category: {selectedRequest.category}</span>
                                        </div>
                                    </div>
                                    <div className="kyc-header-status">
                                        <span className={`status-badge ${selectedRequest.status.toLowerCase()}`}>
                                            {selectedRequest.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="kyc-details-body">
                                {/* Section 1: Basic & Contact Info */}
                                <div className="kyc-section">
                                    <h4 className="kyc-section-header">Business & Contact Information</h4>
                                    <div className="kyc-info-grid">
                                        <div className="kyc-info-item">
                                            <label>Owner Name</label>
                                            <div className="kyc-info-value">{selectedRequest.ownerName}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>Email Address</label>
                                            <div className="kyc-info-value">{selectedRequest.email}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>Contact Number</label>
                                            <div className="kyc-info-value">{selectedRequest.mobile}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>Emergency Number</label>
                                            <div className="kyc-info-value">{selectedRequest.emergencyMobile}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Location Details */}
                                <div className="kyc-section">
                                    <h4 className="kyc-section-header">Location Details</h4>
                                    <div className="kyc-info-grid">
                                        <div className="kyc-info-item span-2">
                                            <label>Address</label>
                                            <div className="kyc-info-value">{selectedRequest.address}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>City / State</label>
                                            <div className="kyc-info-value">{selectedRequest.city}, {selectedRequest.state}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>Country / Pincode</label>
                                            <div className="kyc-info-value">{selectedRequest.country} - {selectedRequest.pincode}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Bank Details */}
                                <div className="kyc-section">
                                    <h4 className="kyc-section-header">Bank Information</h4>
                                    <div className="kyc-info-grid">
                                        <div className="kyc-info-item">
                                            <label>Bank Name</label>
                                            <div className="kyc-info-value">{selectedRequest.bankDetails.bankName}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>Account Holder</label>
                                            <div className="kyc-info-value">{selectedRequest.bankDetails.accountName}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>Account Number</label>
                                            <div className="kyc-info-value">{selectedRequest.bankDetails.accountNumber}</div>
                                        </div>
                                        <div className="kyc-info-item">
                                            <label>IFSC Code</label>
                                            <div className="kyc-info-value">{selectedRequest.bankDetails.ifsc}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Documents */}
                                <div className="kyc-section">
                                    <h4 className="kyc-section-header">Submitted Documents</h4>
                                    <div className="kyc-docs-list">
                                        {selectedRequest.documents.map((doc, idx) => (
                                            <div key={idx} className="doc-card">
                                                <div className="doc-info">
                                                    <div className="doc-icon-box">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="doc-type">{doc.type}</div>
                                                        <div className="doc-meta">ID: {doc.id}</div>
                                                    </div>
                                                </div>
                                                <div className="doc-actions">
                                                    <button className="icon-btn-sm" title="View Document" onClick={() => window.open('#', '_blank')}>
                                                        <Eye size={16} />
                                                    </button>
                                                    <button className="icon-btn-sm" title="Download">
                                                        <Download size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {selectedRequest.rejectionReason && (
                                        <div className="rejection-notice">
                                            <AlertCircle size={20} />
                                            <div>
                                                <div className="rejection-title">Previous Rejection Reason</div>
                                                <div className="rejection-text">{selectedRequest.rejectionReason}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {selectedRequest.status === 'Pending' && (
                                    <div className="kyc-footer">
                                        <button
                                            className="action-btn primary kyc-btn-approve"
                                            onClick={() => handleApprove(selectedRequest.id)}
                                        >
                                            <CheckCircle size={18} /> Approve KYC
                                        </button>
                                        <button
                                            className="action-btn kyc-btn-reject"
                                            onClick={() => handleReject(selectedRequest.id)}
                                        >
                                            <XCircle size={18} /> Reject
                                        </button>
                                    </div>
                                )}

                                {selectedRequest.status !== 'Pending' && (
                                    <div className="kyc-status-banner">
                                        {selectedRequest.status === 'Approved' ? <ShieldCheck size={20} /> : <XCircle size={20} />}
                                        This verification is {selectedRequest.status}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="card kyc-empty-state">
                            <div className="kyc-empty-icon">
                                <ShieldCheck size={40} />
                            </div>
                            <h3>Select a Request</h3>
                            <p style={{ maxWidth: '300px' }}>Select a vendor from the list to review their KYC documents and approve their registration.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorKYC;
