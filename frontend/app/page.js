import TaskList from '../components/TaskList';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Task Manager</h1>
        <ThemeToggle />
      </div>
      <TaskList />
    </main>
  );
}
