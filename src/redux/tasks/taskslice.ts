import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type { Task } from "../../types/task";

import {
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  fetchTasks,
  updateTask as updateTaskApi,
} from "../../services/taskApi";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// GET
export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTasks();
    } catch (error) {
      return rejectWithValue(
        "Failed to fetch tasks"
      );
    }
  }
);

// POST
export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (
    task: Task,
    { rejectWithValue }
  ) => {
    try {
      return await createTaskApi(task);
    } catch (error) {
      return rejectWithValue(
        "Failed to create task"
      );
    }
  }
);

// PUT
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (
    task: Task,
    { rejectWithValue }
  ) => {
    try {
      return await updateTaskApi(task);
    } catch (error) {
      return rejectWithValue(
        "Failed to update task"
      );
    }
  }
);

// DELETE
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (
    taskId: string,
    { rejectWithValue }
  ) => {
    try {
      await deleteTaskApi(taskId);

      return taskId;
    } catch (error) {
      return rejectWithValue(
        "Failed to delete task"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // =========================
    // FETCH TASKS
    // =========================

    builder
      .addCase(
        fetchTasksAsync.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchTasksAsync.fulfilled,
        (state, action) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )

      .addCase(
        fetchTasksAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            (action.payload as string) ??
            "Failed to fetch tasks";
        }
      );

    // =========================
    // CREATE TASK
    // =========================

    builder
      .addCase(
        createTaskAsync.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createTaskAsync.fulfilled,
        (state, action) => {
          state.loading = false;
          state.tasks.push(action.payload);
        }
      )

      .addCase(
        createTaskAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            (action.payload as string) ??
            "Failed to create task";
        }
      );

    // =========================
    // UPDATE TASK
    // =========================

    builder
      .addCase(
        updateTaskAsync.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateTaskAsync.fulfilled,
        (state, action) => {
          state.loading = false;

          const index =
            state.tasks.findIndex(
              (task) =>
                task.id === action.payload.id
            );

          if (index !== -1) {
            state.tasks[index] =
              action.payload;
          }
        }
      )

      .addCase(
        updateTaskAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            (action.payload as string) ??
            "Failed to update task";
        }
      );

    // =========================
    // DELETE TASK
    // =========================

    builder
      .addCase(
        deleteTaskAsync.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action) => {
          state.loading = false;

          state.tasks =
            state.tasks.filter(
              (task) =>
                task.id !== action.payload
            );
        }
      )

      .addCase(
        deleteTaskAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            (action.payload as string) ??
            "Failed to delete task";
        }
      );
  },
});

export default taskSlice.reducer;