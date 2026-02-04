import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Task Manager</h1>
      <TaskList />
    </main>
  );
}
