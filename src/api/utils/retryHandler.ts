import type { ApiError } from '../types';

const NO_RETRY_STATUSES = [401, 404];

const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

export const retryHandler = (failureCount: number, error: unknown): boolean => {
  if (isApiError(error) && NO_RETRY_STATUSES.includes(error.status)) return false;
  return failureCount < 2;
};
