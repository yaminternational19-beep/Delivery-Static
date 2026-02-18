import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Lock,
    Mail,
    ChevronLeft,
    ArrowRight,
    // ShieldBox
} from 'lucide-react';
import './Login.css';
import { validateEmail, validatePassword } from './validation';
import { dummyUsers } from '../../data/dummyUsers';
import Toast from '../../components/common/Toast/Toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(15);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const timerRef = useRef(null);

    useEffect(() => {
        if (step === 2 && timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [step, timer]);

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) return showToast('Please enter a valid email address');
        if (!validatePassword(password)) return showToast('Check the password');

        // Match against dummyUsers
        const user = dummyUsers.find(u => u.email === email && u.password === password);

        if (user) {
            setStep(2);
            setTimer(15);
        } else {
            showToast('Invalid email or password');
        }
    };

    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue === '123456') {
            // Determine role based on dummyUsers
            const user = dummyUsers.find(u => u.email === email);

            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('isAuthenticated', 'true');
            showToast('Login successful!', 'success');
            setTimeout(() => navigate('/'), 1000);
        } else {
            showToast('Invalid OTP. Please try again.');
        }
    };

    const handleResendOtp = () => {
        if (timer === 0) {
            setTimer(45);
            showToast('OTP resent successfully!', 'success');
            // Logic to resend OTP would go here
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {step === 1 ? (
                    <div className="step-content">
                        <div className="login-header">
                            <div style={{
                                width: '64px',
                                height: '64px',
                                background: 'var(--primary-color)',
                                borderRadius: '16px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                marginBottom: 'var(--spacing-md)',
                                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
                            }}>
                                <Lock size={32} />
                            </div>
                            <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Log In</h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Please enter your details.</p>
                        </div>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <div className="input-wrapper">
                                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="email"
                                        className="input-field"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="password"
                                        className="input-field"
                                        placeholder="admin123"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="login-button">
                                Continue <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="step-content">
                        <button className="back-btn" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)', cursor: 'pointer' }}>
                            <ChevronLeft size={18} /> Back to login
                        </button>
                        <div className="login-header">
                            <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Verify OTP</h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Enter 6-digit code sent to <strong>{email}</strong></p>
                        </div>
                        <form onSubmit={handleVerifyOtp}>
                            <div className="otp-container">
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        type="text"
                                        className="otp-input"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                                        maxLength={1}
                                    />
                                ))}
                            </div>
                            <button type="submit" className="login-button">
                                Verify & Login
                            </button>
                            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {timer > 0 ? (
                                        <span>Resend code in <strong style={{ color: 'var(--primary-color)' }}>{timer}s</strong></span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            style={{ background: 'none', color: 'var(--primary-color)', fontWeight: 600, padding: 0 }}
                                        >
                                            Resend Now
                                        </button>
                                    )}
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {toast.show && (
                <div className="toast-container">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast({ ...toast, show: false })}
                    />
                </div>
            )}
        </div>
    );
};

export default LoginPage;
