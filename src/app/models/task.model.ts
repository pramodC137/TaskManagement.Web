export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TaskCreate {
  title: string;
  description: string;
}

export interface TaskUpdate {
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface User {
  userId: number;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}