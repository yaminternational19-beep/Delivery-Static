import React, { useState } from 'react';
import { X, Camera, MapPin, User, Mail, Smartphone, Globe, ShieldAlert } from 'lucide-react';

const SubAdminForm = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(user || {
        name: '',
        email: '',
        mobile: '',
        countryCode: '+1',
        address: '',
        state: '',
        country: 'USA',
        emergencyMobile: '',
        status: 'Active',
        profilePhoto: null
    });

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePhoto: URL.createObjectURL(file) });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{user ? 'Edit Sub-Admin Details' : 'Add New Sub-Admin'}</h3>
                    <button className="icon-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                            <div className="profile-photo-upload">
                                {formData.profilePhoto ? (
                                    <img src={formData.profilePhoto} alt="Profile" className="preview-photo" />
                                ) : (
                                    <div className="photo-placeholder"><User size={40} /></div>
                                )}
                                <label className="upload-badge">
                                    <Camera size={16} />
                                    <input type="file" hidden onChange={handlePhotoUpload} accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-with-icon">
                                    <User size={18} className="field-icon" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-with-icon">
                                    <Mail size={18} className="field-icon" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <div className="mobile-input-group">
                                    <select
                                        value={formData.countryCode}
                                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                        className="dial-code-select"
                                    >
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+91">+91</option>
                                    </select>
                                    <div className="input-with-icon" style={{ flex: 1 }}>
                                        <Smartphone size={16} className="field-icon" />
                                        <input
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            placeholder="Primary Phone"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Emergency Number</label>
                                <div className="input-with-icon">
                                    <ShieldAlert size={18} className="field-icon" color="var(--error)" />
                                    <input
                                        type="tel"
                                        value={formData.emergencyMobile}
                                        onChange={(e) => setFormData({ ...formData, emergencyMobile: e.target.value })}
                                        placeholder="Emergency Contact"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section-title">Address Information</div>

                        <div className="form-group">
                            <label>Door No / Street Address</label>
                            <div className="input-with-icon">
                                <MapPin size={18} className="field-icon" />
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="e.g. 123 Main St, Apt 4B"
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>State / Province</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    placeholder="e.g. California"
                                />
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <div className="input-with-icon">
                                    <Globe size={18} className="field-icon" />
                                    <select
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    >
                                        <option value="USA">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="India">India</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginTop: '16px' }}>
                            <label>Account Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                            <button type="button" className="action-btn secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
                            <button type="submit" className="action-btn primary" style={{ flex: 2 }}>{user ? 'Update Details' : 'Save Sub-Admin'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubAdminForm;
