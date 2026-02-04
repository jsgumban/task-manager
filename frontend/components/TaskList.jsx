'use client';

import { createTask, deleteTask, getTasks, updateTask } from '../lib/api';
import { useEffect, useState } from 'react';

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

  // fetch all tasks from api
  const fetchTasks = async () => {
    const data = await request(() => getTasks());
    if (data) {
      setTasks(data);
      setInitialLoad(false);
    }
  };

  // load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

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
      fetchTasks();
    }
  };

  // delete task with confirmation
  const handleDelete = async (id) => {
    if (!confirm('delete this task?')) return;
    const result = await request(() => deleteTask(id));
    if (result !== null) fetchTasks();
  };

  // quick status change from dropdown
  const handleStatusChange = async (id, status) => {
    const result = await request(() => updateTask(id, { status }));
    if (result) fetchTasks();
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
        <p className="text-gray-500">no tasks yet</p>
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
    </div>
  );
}
