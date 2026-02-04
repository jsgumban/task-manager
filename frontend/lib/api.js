const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// get all tasks
export async function getTasks() {
  const res = await fetch(`${API_URL}/api/tasks`);
  if (!res.ok) throw new Error('failed to fetch tasks');
  return res.json();
}

// get single task
export async function getTask(id) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`);
  if (!res.ok) throw new Error('failed to fetch task');
  return res.json();
}

// create task
export async function createTask(data) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('failed to create task');
  return res.json();
}

// update task
export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('failed to update task');
  return res.json();
}

// delete task
export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('failed to delete task');
}
