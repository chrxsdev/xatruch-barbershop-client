// API response and error types

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
  statusCode?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth API responses
export interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    profileUrl?: string;
    role: 'USER' | 'ADMIN';
  };
  message?: string;
}

export interface RenewTokenResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    profileUrl?: string;
    role: 'USER' | 'ADMIN';
  };
}

// Service API responses
export interface ServiceResponse {
  serviceSaved?: {
    id: string;
    serviceName: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
    isActive: boolean;
  };
  serviceUpdated?: {
    id: string;
    serviceName: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
    isActive: boolean;
  };
  message: string;
}

// File upload response
export interface FileUploadResponse {
  url: string;
  message?: string;
}
