import React from 'react';
import { ShieldCheck, Edit, Trash2, Power } from 'lucide-react';

const ActionButtons = ({ onPermissions, onEdit, onDelete, onToggleStatus, isActive }) => {
    return (
        <div className="action-buttons">
            {onPermissions && (
                <button
                    className="action-btn action-permissions"
                    onClick={onPermissions}
                    type="button"
                    title="Edit Permissions"
                >
                    <ShieldCheck size={18} strokeWidth={2} />
                </button>
            )}

            {onToggleStatus && (
                <button
                    className={`action-btn ${isActive ? 'action-deactivate' : 'action-activate'}`}
                    onClick={onToggleStatus}
                    type="button"
                    title={isActive ? "Deactivate User" : "Activate User"}
                    style={{ color: isActive ? '#f59e0b' : '#10b981' }}
                >
                    <Power size={18} strokeWidth={2} />
                </button>
            )}

            {onEdit && (
                <button
                    className="action-btn action-edit"
                    onClick={onEdit}
                    type="button"
                    title="Edit User"
                >
                    <Edit size={18} strokeWidth={2} />
                </button>
            )}

            {onDelete && (
                <button
                    className="action-btn action-delete"
                    onClick={onDelete}
                    type="button"
                    title={isActive ? "Deactivate before deleting" : "Delete User"}
                    disabled={isActive}
                    style={{ opacity: isActive ? 0.4 : 1, cursor: isActive ? 'not-allowed' : 'pointer' }}
                >
                    <Trash2 size={18} strokeWidth={2} />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
