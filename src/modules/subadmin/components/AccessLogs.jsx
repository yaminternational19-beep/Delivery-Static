import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, User, MousePointer2, Download, Square, CheckSquare, Calendar } from 'lucide-react';

const AccessLogs = ({ onShowToast }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({
        action: 'All Actions',
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
            const matchesAction = filter.action === 'All Actions' || log.action.includes(filter.action.replace('s', ''));

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

    const handleSelectAll = () => {
        setSelectedLogs(selectedLogs.length === paginatedLogs.length ? [] : paginatedLogs.map(l => l.id));
    };

    const handleSelectOne = (id) => {
        setSelectedLogs(prev => prev.includes(id) ? prev.filter(lId => lId !== id) : [...prev, id]);
    };

    const handleExport = () => {
        const data = selectedLogs.length > 0
            ? filteredLogs.filter(l => selectedLogs.includes(l.id))
            : filteredLogs;
        console.log('Exporting Logs:', data);
        onShowToast(`Exporting ${data.length} logs to CSV...`, 'success');
    };

    return (
        <div className="card">
            <div className="table-header" style={{ flexWrap: 'wrap', gap: '12px', padding: '12px 20px' }}>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
                    <div className="search-bar" style={{ width: '240px' }}>
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Search user or IP..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '4px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <Calendar size={14} color="#64748b" />
                        <input
                            type="date"
                            className="date-input-minimal"
                            value={filter.fromDate}
                            onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
                            style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', color: '#1e293b', outline: 'none' }}
                        />
                        <span style={{ color: '#94a3b8' }}>to</span>
                        <input
                            type="date"
                            className="date-input-minimal"
                            value={filter.toDate}
                            onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
                            style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', color: '#1e293b', outline: 'none' }}
                        />
                    </div>

                    <select
                        className="filter-select"
                        value={filter.action}
                        onChange={(e) => setFilter({ ...filter, action: e.target.value })}
                        style={{ minWidth: '140px' }}
                    >
                        <option>All Actions</option>
                        <option>Login</option>
                        <option>Update Sub-Admin</option>
                        <option>Export Data</option>
                    </select>
                </div>

                <div className="action-group">
                    <button className="action-btn primary sm" onClick={handleExport}>
                        <Download size={16} /> Export Logs
                    </button>
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>
                            <button className="icon-btn-plain" onClick={handleSelectAll}>
                                {selectedLogs.length > 0 && selectedLogs.length === paginatedLogs.length ?
                                    <CheckSquare size={20} color="var(--primary-color)" /> : <Square size={20} />}
                            </button>
                        </th>
                        <th>User</th>
                        <th>Operation</th>
                        <th>Details</th>
                        <th>IP Address</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedLogs.map(log => (
                        <tr key={log.id} className={selectedLogs.includes(log.id) ? 'row-selected' : ''}>
                            <td>
                                <button className="icon-btn-plain" onClick={() => handleSelectOne(log.id)}>
                                    {selectedLogs.includes(log.id) ? <CheckSquare size={20} color="var(--primary-color)" /> : <Square size={20} />}
                                </button>
                            </td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={16} color="#64748b" />
                                    </div>
                                    <strong>{log.user}</strong>
                                </div>
                            </td>
                            <td>
                                <span className={`badge-action ${log.action.toLowerCase().includes('login') ? 'success' : ''}`}>
                                    <MousePointer2 size={12} />
                                    {log.action}
                                </span>
                            </td>
                            <td className="text-secondary" style={{ fontSize: '0.85rem' }}>{log.details}</td>
                            <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85rem' }}>{log.ip}</code></td>
                            <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{log.time}</td>
                        </tr>
                    ))}
                    {paginatedLogs.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <Search size={40} color="#cbd5e1" />
                                    <span>No logs found matching your criteria.</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination" style={{ borderTop: '1px solid #f1f5f9', padding: '16px 20px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Showing {paginatedLogs.length} of {filteredLogs.length} entries
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className="page-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="page-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessLogs;
