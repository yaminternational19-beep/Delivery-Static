import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Bike, Calendar, ShieldCheck, Star, Clock, UserX } from 'lucide-react';

const RiderProfileModal = ({ rider, onClose, onTerminate }) => {
    if (!rider) return null;

    // Mock ride history if not provided
    const rides = [
        { id: '#ORD-1234', date: '17 Feb 2026', customer: 'John Doe', location: 'Worli, Mumbai', status: 'Delivered', amount: '$12.50' },
        { id: '#ORD-1235', date: '16 Feb 2026', customer: 'Sarah Smith', location: 'Bandra, Mumbai', status: 'Delivered', amount: '$8.20' },
        { id: '#ORD-1236', date: '16 Feb 2026', customer: 'Mike Ross', location: 'Dadar, Mumbai', status: 'Delivered', amount: '$15.00' },
    ];

    return (
        <div className="modal-overlay">
            <div className="rider-view-modal">
                <div className="modal-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="profile-large-avatar">
                            {rider.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h2 style={{ margin: 0 }}>{rider.name}</h2>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{rider.id}</p>
                        </div>
                    </div>
                    <button className="icon-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <div className="modal-body">
                    <div className="profile-grid">
                        <div className="profile-left">
                            <h3 className="section-title">Personal Details</h3>
                            <div className="detail-item">
                                <Phone size={16} /> <span>{rider.phone}</span>
                            </div>
                            <div className="detail-item">
                                <Mail size={16} /> <span>{rider.email}</span>
                            </div>
                            <div className="detail-item">
                                <MapPin size={16} /> <span>{rider.city}, {rider.state}, {rider.country}</span>
                            </div>
                            <div className="detail-item">
                                <Calendar size={16} /> <span>Joined {rider.joinedDate}</span>
                            </div>

                            <h3 className="section-title" style={{ marginTop: '24px' }}>Vehicle Information</h3>
                            <div className="detail-item">
                                <Bike size={16} /> <span>{rider.vehicle}</span>
                            </div>
                            <div className="detail-item">
                                <ShieldCheck size={16} /> <span>Plate: {rider.vehicleNumber}</span>
                            </div>

                            <button
                                className="action-btn error-light"
                                style={{ width: '100%', marginTop: '32px', justifyContent: 'center' }}
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to terminate rider ${rider.name}?`)) {
                                        onTerminate(rider.id);
                                        onClose();
                                    }
                                }}
                            >
                                <UserX size={18} /> Terminate Account
                            </button>
                        </div>

                        <div className="profile-right">
                            <div className="stats-mini-grid">
                                <div className="stat-card-small">
                                    <Clock size={20} color="var(--primary-color)" />
                                    <div>
                                        <div className="stat-val">124</div>
                                        <div className="stat-lbl">Total Rides</div>
                                    </div>
                                </div>
                                <div className="stat-card-small">
                                    <Star size={20} color="#f59e0b" />
                                    <div>
                                        <div className="stat-val">4.8</div>
                                        <div className="stat-lbl">Rating</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="section-title" style={{ marginTop: '24px' }}>Recent Ride History</h3>
                            <div className="ride-history-table">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', textAlign: 'left' }}>
                                        <tr>
                                            <th style={{ padding: '10px' }}>Order ID</th>
                                            <th style={{ padding: '10px' }}>Customer</th>
                                            <th style={{ padding: '10px' }}>Location</th>
                                            <th style={{ padding: '10px' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rides.map(ride => (
                                            <tr key={ride.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '10px', fontSize: '0.85rem' }}>{ride.id}</td>
                                                <td style={{ padding: '10px', fontSize: '0.85rem' }}>{ride.customer}</td>
                                                <td style={{ padding: '10px', fontSize: '0.85rem' }}>{ride.location}</td>
                                                <td style={{ padding: '10px' }}>
                                                    <span className="badge success" style={{ fontSize: '0.7rem' }}>{ride.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderProfileModal;
