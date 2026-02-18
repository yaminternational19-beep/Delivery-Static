import React, { useState } from 'react';
import { X, CheckCircle, AlertOctagon, FileText, Download } from 'lucide-react';

const RiderKYC = ({ rider, onClose, onApprove, onReject }) => {
    const [rejectionReason, setRejectionReason] = useState('');
    if (!rider) return null;

    return (
        <div className="kyc-modal-overlay">
            <div className="kyc-modal-content">
                <div className="kyc-header">
                    <div>
                        <h2 style={{ margin: 0 }}>KYC Document Verification</h2>
                        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                            Reviewing documents for <strong>{rider.name}</strong> ({rider.id})
                        </p>
                    </div>
                    <button className="icon-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <div className="kyc-body">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                        {/* Personal Details */}
                        <div>
                            <h4 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>Personal Summary</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Full Name</label>
                                    <div style={{ fontWeight: 600 }}>{rider.name}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</label>
                                    <div style={{ fontWeight: 600 }}>{rider.email}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Phone Number</label>
                                    <div style={{ fontWeight: 600 }}>{rider.phone}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Vehicle Type</label>
                                    <div style={{ fontWeight: 600 }}>{rider.vehicle || 'Motorcycle'}</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Living Address</label>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sector 45, DLF Phase 1, Gurgaon, HR - 122002</div>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div>
                            <h4 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>Uploaded Documents</h4>
                            <div className="kyc-document-grid">
                                <div className="kyc-doc-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Driver's License (Front)</span>
                                        <button className="icon-btn sm"><Download size={14} /></button>
                                    </div>
                                    <div className="kyc-doc-image">
                                        <FileText size={40} />
                                    </div>
                                </div>
                                <div className="kyc-doc-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Driver's License (Back)</span>
                                        <button className="icon-btn sm"><Download size={14} /></button>
                                    </div>
                                    <div className="kyc-doc-image">
                                        <FileText size={40} />
                                    </div>
                                </div>
                                <div className="kyc-doc-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Identity Proof (Adhaar/ID)</span>
                                        <button className="icon-btn sm"><Download size={14} /></button>
                                    </div>
                                    <div className="kyc-doc-image">
                                        <FileText size={40} />
                                    </div>
                                </div>
                                <div className="kyc-doc-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Vehicle RC</span>
                                        <button className="icon-btn sm"><Download size={14} /></button>
                                    </div>
                                    <div className="kyc-doc-image">
                                        <FileText size={40} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ marginBottom: '10px' }}>Rejection Reason (Optional)</h4>
                        <textarea
                            placeholder="Type the reason for rejection here... (e.g., Blur documents, invalid ID)"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                minHeight: '80px',
                                fontSize: '0.9rem'
                            }}
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                    </div>

                    <div style={{
                        marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #e2e8f0',
                        display: 'flex', gap: '20px', justifyContent: 'flex-end'
                    }}>
                        <button
                            className="action-btn secondary"
                            style={{ padding: '12px 30px' }}
                            onClick={() => onReject(rider, rejectionReason)}
                        >
                            <AlertOctagon size={20} style={{ marginRight: '8px' }} />
                            Reject - Request Re-upload
                        </button>
                        <button
                            className="action-btn primary"
                            style={{ padding: '12px 40px', background: '#10b981' }}
                            onClick={() => onApprove(rider)}
                        >
                            <CheckCircle size={20} style={{ marginRight: '8px' }} />
                            Approve & Verify Rider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderKYC;
