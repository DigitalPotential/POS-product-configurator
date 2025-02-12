export type ErrorType = 'validation' | 'api' | 'system';

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
} 