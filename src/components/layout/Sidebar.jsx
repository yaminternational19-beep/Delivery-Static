import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Package,
    Headphones,
    CreditCard,
    FileText,
    ShieldCheck,
    Settings,
    ChevronLeft,
    Menu,
    Truck,
    BarChart3,
    Ticket,
    Undo2,
    Receipt,
    Users2,
    Layers,
    ListTree,
    Award,
    Bike,
    Car,
    Scale,
    Navigation
} from 'lucide-react';
import { rolePermissions } from '../../utils/rolePermissions';
import './Sidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Update global CSS variable for layout sync
    React.useEffect(() => {
        const width = isCollapsed ? '80px' : '260px'; // Matching variable.css
        document.documentElement.style.setProperty('--sidebar-width', width);
    }, [isCollapsed]);

    const userRole = localStorage.getItem('userRole') || 'SUPER_ADMIN';
    const permissions = rolePermissions[userRole] || [];

    const menuItems = [
        { name: "Dashboard", key: "DASHBOARD", icon: LayoutDashboard, path: "/" },
        // { name: "Dashboard", key: "DASHBOARD", icon: LayoutDashboard, path: "/", group: "PLATFORM" },
        { name: "Sub-Admins", key: "SUB_ADMINS", icon: Users, path: "/subadmin", group: "MANAGEMENT" },
        { name: "Vendors", key: "VENDORS", icon: Truck, path: "/vendors", group: "MANAGEMENT" },

        { name: "Categories", key: "CATEGORIES", icon: Layers, path: "/categories", group: "MANAGEMENT" },
        { name: "Sub-Categories", key: "SUBCATEGORIES", icon: ListTree, path: "/sub-categories", group: "MANAGEMENT" },
        { name: "Brands", key: "BRANDS", icon: Award, path: "/brands", group: "MANAGEMENT" },

        { name: "Products", key: "PRODUCTS", icon: Package, path: "/products", group: "MANAGEMENT" },
        { name: "Products", key: "VENDOR_PRODUCTS", icon: Package, path: "/vendor-products", group: "MANAGEMENT" },
        { name: "Orders", key: "ORDERS", icon: ShoppingBag, path: "/orders", group: "MANAGEMENT" },
        { name: "Orders", key: "VENDOR_ORDERS", icon: ShoppingBag, path: "/vendor-orders", group: "MANAGEMENT" },

        { name: "Vehicle Types", key: "VEHICLES", icon: Car, path: "/vehicles", group: "MANAGEMENT" },
        { name: "Quantity", key: "QUANTITY", icon: Scale, path: "/quantity", group: "MANAGEMENT" },
        { name: "Riders", key: "RIDERS", icon: Bike, path: "/riders", group: "MANAGEMENT" },
        { name: "Customers", key: "CUSTOMERS", icon: Users, path: "/customers", group: "MANAGEMENT" },


        { name: "Tickets", key: "TICKETS", icon: Ticket, path: "/tickets", group: "SUPPORT" },
        { name: "Refunds", key: "REFUNDS", icon: Undo2, path: "/refunds", group: "SUPPORT" },
        { name: "Payouts", key: "PAYOUTS", icon: CreditCard, path: "/payouts", group: "FINANCE" },
        { name: "Invoices", key: "INVOICES", icon: Receipt, path: "/invoices", group: "FINANCE" },
        { name: "Staff", key: "STAFF", icon: Users2, path: "/staff", group: "VENDOR" },
        { name: "Reports", key: "REPORTS", icon: BarChart3, path: "/reports", group: "VENDOR" },
        { name: "Settings", key: "SETTINGS", icon: Settings, path: "/settings", group: "OTHER" },
    ];

    const filteredMenu = permissions.includes("ALL")
        ? menuItems
        : menuItems.filter(item => permissions.includes(item.key));

    const groups = {
        PLATFORM: "Platform",
        MANAGEMENT: "Management",
        SUPPORT: "Support",
        FINANCE: "Finance",
        VENDOR: "Vendor Mgmt",
        OTHER: "Other"
    };

    const groupedMenu = filteredMenu.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header" style={{ justifyContent: isCollapsed ? 'center' : 'space-between', padding: '0 24px' }}>
                {!isCollapsed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ padding: '6px', background: '#6366f1', borderRadius: '8px', color: 'white', display: 'flex' }}>
                            <Truck size={20} />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', letterSpacing: '-0.5px' }}>Shipzzy</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        padding: '6px',
                        borderRadius: '6px',
                        hover: { background: '#f1f5f9' },
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <div className="sidebar-content">
                {Object.keys(groupedMenu).map(groupKey => (
                    <div key={groupKey} style={{ marginBottom: '24px' }}>
                        {!isCollapsed && (
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#94a3b8',
                                textTransform: 'uppercase',
                                padding: '0 12px 8px',
                                display: 'block',
                                letterSpacing: '0.05em'
                            }}>
                                {groups[groupKey]}
                            </span>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {groupedMenu[groupKey].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.key}
                                        to={item.path}
                                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                                        title={isCollapsed ? item.name : ''}
                                        style={isCollapsed ? { justifyContent: 'center', padding: '12px' } : {}}
                                    >
                                        <Icon size={20} />
                                        {!isCollapsed && <span>{item.name}</span>}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
