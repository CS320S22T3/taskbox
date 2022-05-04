export interface PerformanceReviewRequest {
  id: number;
}

export interface TimeOffRequest {
  id: number;
  type: number;
  start_date: Date;
  end_date: Date;
  notes: string;
}

export interface TrainingAssignment {
  id: number;
  link: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  info_id: number;
  info_type: string;
  assigner_id: number;
  assignee_id: number;
  due_date: Date;
}

export interface User {
  id: number;
  email: string;
  password_digest: string;
}

export interface UserInformation {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  position: string;
  date_hired: Date;
  is_manager: boolean;
}

export type TaskInfo = TimeOffRequest | PerformanceReviewRequest | TrainingAssignment;

type _TaskInput<T> = Omit<T, "id" | "info_id" | "info_type">

export type TaskInput = _TaskInput<Task>;

export type TimeOffRequestInput = _TaskInput<TimeOffRequest>;

export type PerformanceReviewRequestInput = _TaskInput<PerformanceReviewRequest>;

export type TrainingAssignmentInput = _TaskInput<TrainingAssignment>;

export type TaskInfoInput = TrainingAssignmentInput | PerformanceReviewRequestInput | TimeOffRequestInput;

