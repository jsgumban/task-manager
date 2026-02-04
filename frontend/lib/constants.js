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

// status badge colors
export const STATUS_COLORS = {
  [STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [STATUS.COMPLETED]: 'bg-green-100 text-green-800',
};

// priority badge colors
export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: 'bg-gray-100 text-gray-800',
  [PRIORITY.MEDIUM]: 'bg-orange-100 text-orange-800',
  [PRIORITY.HIGH]: 'bg-red-100 text-red-800',
};
