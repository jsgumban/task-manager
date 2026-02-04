'use client';

import { createTask, deleteTask, getTasks, updateTask } from '../lib/api';
import { useEffect, useState } from 'react';
import { STATUS, PRIORITY, SORT_OPTIONS } from '../lib/constants';

import Modal from './Modal';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import useApi from '../lib/useApi';

// main component for displaying and managing tasks
export default function TaskList() {
  const { loading, error, request, clearError } = useApi();

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // filters
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sortBy: 'created_at-desc'
  });

  const inputClass = 'border rounded px-3 py-2';

  // fetch tasks with filters and pagination
  const fetchTasks = async (currentFilters, currentPage = 1) => {
    const [sort, order] = currentFilters.sortBy.split('-');
    const params = { ...currentFilters, sort, order, page: currentPage, limit: 10 };
    delete params.sortBy;

    const result = await request(() => getTasks(params));
    if (result) {
      setTasks(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setPage(result.page);
      setInitialLoad(false);
    }
  };

  // load tasks on mount and when filters change
  useEffect(() => {
    setPage(1);
    fetchTasks(filters, 1);
  }, [filters]);

  // filter handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // modal handlers
  const openCreateModal = () => {
    clearError();
    setEditingTask(null);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    clearError();
    setEditingTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  // create or update task
  const handleSubmit = async (data) => {
    const result = editingTask
      ? await request(() => updateTask(editingTask.id, data))
      : await request(() => createTask(data));

    if (result) {
      closeModal();
      fetchTasks(filters, page);
    }
  };

  // delete task with confirmation
  const handleDelete = async (id) => {
    if (!confirm('delete this task?')) return;
    const result = await request(() => deleteTask(id));
    if (result !== null) fetchTasks(filters, page);
  };

  // quick status change from dropdown
  const handleStatusChange = async (id, status) => {
    const result = await request(() => updateTask(id, { status }));
    if (result) fetchTasks(filters, page);
  };

  // pagination handlers
  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchTasks(filters, newPage);
    }
  };

  // initial loading state
  if (initialLoad && loading) return <p>loading...</p>;

  return (
    <div>
      {/* loading indicator */}
      {loading && !initialLoad && (
        <p className="text-blue-600 mb-4">saving...</p>
      )}

      {/* error message */}
      {error && (
        <p className="text-red-600 mb-4">
          {error} <button onClick={clearError}>(dismiss)</button>
        </p>
      )}

      {/* filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className={inputClass}
        />
        <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)} className={inputClass}>
          <option value="">All Status</option>
          {Object.values(STATUS).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filters.priority} onChange={(e) => handleFilterChange('priority', e.target.value)} className={inputClass}>
          <option value="">All Priority</option>
          {Object.values(PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)} className={inputClass}>
          {Object.entries(SORT_OPTIONS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      {/* add task button */}
      <button onClick={openCreateModal} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        + Add Task
      </button>

      {/* task form modal */}
      <Modal isOpen={showModal} onClose={closeModal} title={editingTask ? 'Edit Task' : 'New Task'}>
        <TaskForm task={editingTask} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>

      {/* task list */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">no tasks found</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages} ({total} tasks)
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
