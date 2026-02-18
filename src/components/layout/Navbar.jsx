import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Search, Menu, LogOut, Settings, Shield } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const userRole = localStorage.getItem('userRole') || 'Guest';
    const userName = "John Doe"; // Static for now

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const formatRole = (role) => {
        return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <nav className="navbar glass">
            <div className="navbar-left">
                <button onClick={onMenuClick} className="icon-btn menu-btn" style={{ display: 'none' }}>
                    <Menu size={20} />
                </button>
            </div>

            <div className="navbar-right">
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>

                <div className="profile-section" ref={dropdownRef}>
                    <div className="profile-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="profile-avatar">
                            <User size={20} />
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">{userName}</span>
                            <span className="profile-role">{formatRole(userRole)}</span>
                        </div>
                    </div>

                    {showDropdown && (
                        <div className="profile-dropdown">
                            <button className="dropdown-item">
                                <User size={18} /> My Profile
                            </button>
                            <button className="dropdown-item logout" onClick={handleLogout}>
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
