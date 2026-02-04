const { STATUS, PRIORITY } = require('../constants');

const VALID_STATUSES = Object.values(STATUS);
const VALID_PRIORITIES = Object.values(PRIORITY);

function validateTask(data, isUpdate = false) {
  const errors = [];

  // title validation
  if (!isUpdate && (!data.title || !data.title.trim())) {
    errors.push('title is required');
  }
  if (data.title && data.title.length > 100) {
    errors.push('title must be 100 characters or less');
  }

  // description validation
  if (data.description && data.description.length > 500) {
    errors.push('description must be 500 characters or less');
  }

  // status validation
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  // priority validation
  if (data.priority && !VALID_PRIORITIES.includes(data.priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  return errors;
}

module.exports = { validateTask };
