import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskEditPage from "./pages/TaskEditPage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "./redux/store";
import { fetchTasksAsync } from "./redux/tasks/taskslice";

function App() {
  
 const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <header className="page-header">
                <h1>Task Management App</h1>
                <p>
                  Manage, track, and organize your tasks.
                </p>
              </header>

              <AddTaskForm />
              <TaskList />
            </div>
          }
        />

        <Route
          path="/tasks/:id"
          element={<TaskDetailsPage />}
        />

        <Route
          path="/tasks/:id/edit"
          element={<TaskEditPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;