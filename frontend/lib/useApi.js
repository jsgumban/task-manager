'use client';

import { useState, useCallback } from 'react';

// hook for centralized api loading and error handling
export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  // wraps any async function with loading/error handling
  const request = useCallback(async (fn) => {
    try {
      setLoading(true);
      setError(null);
      return await fn();
    } catch (err) {
      setError(err.message || 'something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request, clearError };
}
