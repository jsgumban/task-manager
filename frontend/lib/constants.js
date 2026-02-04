// task status options
export const STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

// task priority levels
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

// sort options
export const SORT_OPTIONS = {
  'created_at-desc': 'Newest first',
  'created_at-asc': 'Oldest first',
  'due_date-asc': 'Due date (soonest)',
  'priority-desc': 'Priority (high first)',
};

// status badge colors
export const STATUS_COLORS = {
  [STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [STATUS.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

// priority badge colors
export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  [PRIORITY.MEDIUM]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  [PRIORITY.HIGH]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};
