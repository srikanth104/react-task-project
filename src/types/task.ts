export type TaskStatus =
  | "Open"
  | "In-Progress"
  | "Under-review"
  | "Done";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High";

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  endDate: string;
}