import axios from "axios";

import type { Task } from "../types/task";

const API_URL = "http://localhost:3001/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
}

export async function createTask(task: Task): Promise<Task> {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await axios.put<Task>(
    `${API_URL}/${task.id}`,
    task
  );

  return response.data;
}

export async function deleteTask(taskId: string): Promise<void> {
  await axios.delete(`${API_URL}/${taskId}`);
}