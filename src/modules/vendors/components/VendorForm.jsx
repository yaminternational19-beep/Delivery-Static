import React, { useState } from 'react';
import {
    Upload, X, Check, ArrowRight, ArrowLeft, Store,
    MapPin, CreditCard, FileText, Camera, User,
    Mail, Lock, Smartphone, ShieldAlert, Globe
} from 'lucide-react';

const VendorForm = ({ onCancel, onSave, initialData }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: initialData?.name || initialData?.businessName || '',
        category: initialData?.category || 'Restaurant',
        fullName: initialData?.fullName || '',
        email: initialData?.email || '',
        password: initialData?.password || '',
        countryCode: initialData?.countryCode || '+1',
        mobile: initialData?.mobile || '',
        emergencyMobile: initialData?.emergencyMobile || '',
        profilePhoto: initialData?.profilePhoto || null,
        address: initialData?.address || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
        country: initialData?.country || 'India',
        pincode: initialData?.pincode || '',
        coordinates: initialData?.coordinates || '',
        licenseNumber: initialData?.licenseNumber || '',
        bankName: initialData?.bankName || '',
        accountName: initialData?.accountName || '',
        accountNumber: initialData?.accountNumber || '',
        ifsc: initialData?.ifsc || ''
    });

    const steps = [
        { id: 1, title: 'Basic Info', icon: Store },
        { id: 2, title: 'Location', icon: MapPin },
        { id: 3, title: 'Business IDs', icon: FileText },
        { id: 4, title: 'Bank Details', icon: CreditCard }
    ];

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePhoto: URL.createObjectURL(file) });
        }
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="vendor-step-content">
                        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div className="profile-photo-upload" style={{ margin: 0, minWidth: '100px' }}>
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

                            <div style={{ flex: 1, display: 'column', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div className="form-group">
                                    <label>Business Name</label>
                                    <div className="input-with-icon">
                                        <Store size={18} className="field-icon" />
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => updateField('businessName', e.target.value)}
                                            placeholder="e.g. Spice Garden Restaurant"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Business Category</label>
                                    <div className="input-with-icon">
                                        <Globe size={18} className="field-icon" />
                                        <select
                                            value={formData.category}
                                            onChange={(e) => updateField('category', e.target.value)}
                                        >
                                            <option value="Restaurant">Restaurant</option>
                                            <option value="Grocery">Grocery</option>
                                            <option value="Pharma">Pharma</option>
                                            <option value="Meat & Fish">Meat & Fish</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Owner Full Name</label>
                                <div className="input-with-icon">
                                    <User size={18} className="field-icon" />
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => updateField('fullName', e.target.value)}
                                        placeholder="Legal name of owner"
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
                                        onChange={(e) => updateField('email', e.target.value)}
                                        placeholder="contact@business.com"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-with-icon">
                                    <Lock size={18} className="field-icon" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => updateField('password', e.target.value)}
                                        placeholder="********"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <div className="mobile-input-group">
                                    <select
                                        value={formData.countryCode}
                                        onChange={(e) => updateField('countryCode', e.target.value)}
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
                                            onChange={(e) => updateField('mobile', e.target.value)}
                                            placeholder="Primary Phone"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact</label>
                                <div className="input-with-icon">
                                    <ShieldAlert size={18} className="field-icon" color="var(--error)" />
                                    <input
                                        type="tel"
                                        value={formData.emergencyMobile}
                                        onChange={(e) => updateField('emergencyMobile', e.target.value)}
                                        placeholder="Emergency number"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="vendor-step-content">
                        <div className="form-group">
                            <label>Door No / Building / Street</label>
                            <div className="input-with-icon">
                                <MapPin size={18} className="field-icon" />
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => updateField('address', e.target.value)}
                                    placeholder="Full address"
                                />
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => updateField('city', e.target.value)}
                                    placeholder="City"
                                />
                            </div>
                            <div className="form-group">
                                <label>State / Province</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => updateField('state', e.target.value)}
                                    placeholder="State"
                                />
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <select
                                    value={formData.country}
                                    onChange={(e) => updateField('country', e.target.value)}
                                >
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Pincode / Zip</label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    onChange={(e) => updateField('pincode', e.target.value)}
                                    placeholder="6-digit code"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Geo Location (Coordinates)</label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div className="input-with-icon" style={{ flex: 1 }}>
                                    <MapPin size={16} className="field-icon" />
                                    <input
                                        type="text"
                                        value={formData.coordinates}
                                        onChange={(e) => updateField('coordinates', e.target.value)}
                                        placeholder="Lat / Long"
                                    />
                                </div>
                                <button type="button" className="action-btn secondary" style={{ whiteSpace: 'nowrap' }}>Pick from Map</button>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="vendor-step-content">
                        <div className="form-group">
                            <label>Trade License Number</label>
                            <input
                                type="text"
                                value={formData.licenseNumber}
                                onChange={(e) => updateField('licenseNumber', e.target.value)}
                                placeholder="Enter trade license ID"
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload Trade License (PDF/Image)</label>
                            <div className="doc-upload-box" style={{
                                border: '2px dashed #cbd5e1',
                                padding: '32px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                background: '#f8fafc'
                            }}>
                                <Upload size={32} color="#64748b" style={{ marginBottom: '12px' }} />
                                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Click to upload or drag and drop</p>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="vendor-step-content">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Bank Name</label>
                                <input
                                    type="text"
                                    value={formData.bankName}
                                    onChange={(e) => updateField('bankName', e.target.value)}
                                    placeholder="e.g. HDFC Bank"
                                />
                            </div>
                            <div className="form-group">
                                <label>Account Holder Name</label>
                                <input
                                    type="text"
                                    value={formData.accountName}
                                    onChange={(e) => updateField('accountName', e.target.value)}
                                    placeholder="Name as per passbook"
                                />
                            </div>
                            <div className="form-group">
                                <label>Account Number</label>
                                <input
                                    type="text"
                                    value={formData.accountNumber}
                                    onChange={(e) => updateField('accountNumber', e.target.value)}
                                    placeholder="Enter account number"
                                />
                            </div>
                            <div className="form-group">
                                <label>IFSC Code</label>
                                <input
                                    type="text"
                                    value={formData.ifsc}
                                    onChange={(e) => updateField('ifsc', e.target.value)}
                                    placeholder="SBIN0001234"
                                />
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="modal-overlay">
            <div className="card vendor-form-huge-standard" style={{ padding: 0 }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>Register New Vendor</h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Onboard a professional partner to the platform</p>
                    </div>
                    <button className="icon-btn" onClick={onCancel}><X size={20} /></button>
                </div>

                <div style={{ padding: '20px', background: '#f8fafc', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                    {steps.map((s) => (
                        <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: step >= s.id ? 1 : 0.4 }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: step > s.id ? '#10b981' : step === s.id ? '#6366f1' : '#cbd5e1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                {step > s.id ? <Check size={16} /> : <s.icon size={16} />}
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{s.title}</span>
                        </div>
                    ))}
                </div>

                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {renderStep()}
                </div>

                <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        className="action-btn secondary"
                        onClick={() => step > 1 && setStep(step - 1)}
                        disabled={step === 1}
                    >
                        <ArrowLeft size={16} /> Previous
                    </button>
                    {step < 4 ? (
                        <button className="action-btn primary" onClick={() => setStep(step + 1)}>
                            Next Step <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button
                            className="action-btn primary"
                            onClick={() => onSave?.(formData.businessName)}
                            style={{ background: '#10b981' }}
                        >
                            Finish Registration <Check size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorForm;
