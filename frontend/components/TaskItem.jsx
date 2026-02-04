'use client';

import { STATUS, PRIORITY, STATUS_COLORS, PRIORITY_COLORS } from '../lib/constants';

// single task card with actions
export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        {/* task info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg break-words">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1 break-words whitespace-pre-wrap">{task.description}</p>
          )}
          {/* badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded ${STATUS_COLORS[task.status]}`}>
              {task.status}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          {/* dates */}
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
            {task.due_date && <span>Due: {task.due_date}</span>}
            <span>Created: {task.created_at}</span>
          </div>
        </div>

        {/* actions */}
        <div className="flex flex-wrap gap-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value={STATUS.PENDING}>{STATUS.PENDING}</option>
            <option value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</option>
            <option value={STATUS.COMPLETED}>{STATUS.COMPLETED}</option>
          </select>
          <button
            onClick={() => onEdit(task)}
            className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
