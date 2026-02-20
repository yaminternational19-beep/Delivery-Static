import React, { useState, useMemo } from 'react';
import { Search, Calendar, ChevronLeft, ChevronRight, User, Terminal, ArrowRight } from 'lucide-react';
import ExportActions from '../../../components/common/ExportActions';

const AccessLogs = ({ onShowToast }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({
        action: '',
        fromDate: '',
        toDate: ''
    });
    const [selectedLogs, setSelectedLogs] = useState([]);

    const allLogs = useMemo(() => Array.from({ length: 45 }, (_, i) => {
        const date = new Date();
        date.setHours(date.getHours() - i * 2);
        return {
            id: i + 1,
            user: `Admin ${i + 1}`,
            action: i % 3 === 0 ? 'Login' : i % 3 === 1 ? 'Update Sub-Admin' : 'Export Data',
            ip: `192.168.1.${100 + i}`,
            time: date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            timestamp: date,
            details: i % 3 === 1 ? 'Updated sub-admin #4421' : 'Platform access'
        };
    }), []);

    const filteredLogs = useMemo(() => {
        return allLogs.filter(log => {
            const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.ip.includes(searchQuery);
            const matchesAction = !filter.action || log.action === filter.action;

            let matchesDate = true;
            if (filter.fromDate) {
                matchesDate = matchesDate && new Date(log.timestamp) >= new Date(filter.fromDate);
            }
            if (filter.toDate) {
                const toDateEnd = new Date(filter.toDate);
                toDateEnd.setHours(23, 59, 59, 999);
                matchesDate = matchesDate && new Date(log.timestamp) <= toDateEnd;
            }

            return matchesSearch && matchesAction && matchesDate;
        });
    }, [allLogs, searchQuery, filter]);

    const logsPerPage = 10;
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    const paginatedLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedLogs(paginatedLogs.map(l => l.id));
        } else {
            setSelectedLogs([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedLogs(prev => prev.includes(id) ? prev.filter(lId => lId !== id) : [...prev, id]);
    };

    return (
        <div className="list-wrapper">
            {/* Filter Section */}
            <div className="filter-bar">
                <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
                    <div className="filter-search" style={{ flex: '0 1 280px' }}>
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search user or IP..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '0 12px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '42px' }}>
                        <Calendar size={16} color="#94a3b8" />
                        <input
                            type="date"
                            value={filter.fromDate}
                            onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
                            style={{ border: 'none', background: 'transparent', fontSize: '13px', color: '#1e293b', outline: 'none', width: '110px' }}
                        />
                        <ArrowRight size={14} color="#cbd5e1" />
                        <input
                            type="date"
                            value={filter.toDate}
                            onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
                            style={{ border: 'none', background: 'transparent', fontSize: '13px', color: '#1e293b', outline: 'none', width: '110px' }}
                        />
                    </div>

                    <select
                        className="filter-select"
                        style={{ width: '160px' }}
                        value={filter.action}
                        onChange={(e) => setFilter({ ...filter, action: e.target.value })}
                    >
                        <option value="">All Actions</option>
                        <option value="Login">Login</option>
                        <option value="Update Sub-Admin">Update Sub-Admin</option>
                        <option value="Export Data">Export Data</option>
                    </select>
                </div>

                <div className="filter-controls">
                    <ExportActions
                        selectedCount={selectedLogs.length}
                        onExport={onShowToast}
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="col-checkbox">
                                <input
                                    type="checkbox"
                                    className="checkbox-input"
                                    checked={paginatedLogs.length > 0 && selectedLogs.length === paginatedLogs.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Profile</th>
                            <th>Full Name</th>
                            <th>Contact</th>
                            <th>Operation</th>
                            <th>Details</th>
                            <th>IP Address</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedLogs.map(log => (
                            <tr key={log.id} style={{ background: selectedLogs.includes(log.id) ? '#f8fafc' : 'white' }}>
                                <td className="col-checkbox">
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        checked={selectedLogs.includes(log.id)}
                                        onChange={() => handleSelectOne(log.id)}
                                    />
                                </td>
                                <td>
                                    <div className="profile-avatar" style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0' }}>
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.user}`}
                                            alt={log.user}
                                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <span style={{ fontWeight: 600, color: '#111827' }}>{log.user}</span>
                                </td>
                                <td>
                                    <span style={{ color: '#64748b', fontSize: '13px' }}>+1 987 654 3210</span>
                                </td>
                                <td>
                                    <span className={`status-badge ${log.action === 'Login' ? 'status-active' : 'status-pending'}`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>{log.details}</span>
                                </td>
                                <td>
                                    <code style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', color: '#475569', border: '1px solid #e2e8f0' }}>
                                        {log.ip}
                                    </code>
                                </td>
                                <td>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>{log.time}</span>
                                </td>
                            </tr>
                        ))}
                        {paginatedLogs.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center p-4" style={{ color: '#94a3b8' }}>
                                    No access logs found matching criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e6eaf0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Showing</span>
                    <span style={{ padding: '4px 10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                        {paginatedLogs.length}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>of</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{filteredLogs.length}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>entries</span>
                </div>
                <div className="btn-group">
                    <button
                        className="btn btn-secondary"
                        style={{ height: '34px', fontSize: '13px' }}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>
                    <button
                        className="btn btn-secondary"
                        style={{ height: '34px', fontSize: '13px' }}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessLogs;
