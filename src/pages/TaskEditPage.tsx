import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import type {
  AppDispatch,
  RootState,
} from "../redux/store";

import { updateTaskAsync } from "../redux/tasks/taskslice";

import type {
  TaskPriority,
  TaskStatus,
} from "../types/task";


function TaskEditPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const tasks = useSelector(
  (state: RootState) => state.tasks.tasks
  );

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(
      (task) => task.id === id
    )
  );

  console.log("Edit page task:", task);
  console.log("URL id:", id);
  console.log("Redux tasks:", tasks);
  console.log("Edit page task:", task);

  const [title, setTitle] = useState(
    task?.title ?? ""
  );

  const [assignedTo, setAssignedTo] = useState(
    task?.assignedTo ?? ""
  );

  const [status, setStatus] =
    useState<TaskStatus>(
      task?.status ?? "Open"
    );

  const [priority, setPriority] =
    useState<TaskPriority>(
      task?.priority ?? "Medium"
    );

  const [startDate, setStartDate] =
    useState(task?.startDate ?? "");

  const [endDate, setEndDate] =
    useState(task?.endDate ?? "");

    
    useEffect(() => {
    if (task) {
      setTitle(task.title);
      setAssignedTo(task.assignedTo);
      setStatus(task.status);
      setPriority(task.priority);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
    }
  }, [task]);


  if (!task) {
    return (
      <div className="app-container">
        <div className="form-card">
          <h2>Task Not Found</h2>

          <button
            className="primary-button"
            onClick={() => navigate("/")}
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!assignedTo.trim()) {
      alert("Assigned To is required");
      return;
    }

    if (!startDate.trim()) {
      alert("Start Date is required");
      return;
    }

    const updatedTask = {
      id: task.id,
      title: title.trim(),
      assignedTo: assignedTo.trim(),
      status,
      priority,
      startDate,
      endDate,
    };

    dispatch(updateTaskAsync (updatedTask));

    navigate("/");
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <h1>Edit Task</h1>

        <p>
          Update the task information below.
        </p>
      </header>

      <div className="form-card">
        <form
          className="task-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="title">
              Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo">
              Assigned To
            </label>

            <input
              id="assignedTo"
              type="email"
              value={assignedTo}
              onChange={(event) =>
                setAssignedTo(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as TaskStatus
                )
              }
            >
              <option value="Open">
                Open
              </option>

              <option value="In-Progress">
                In-Progress
              </option>

              <option value="Under-review">
                Under-review
              </option>

              <option value="Done">
                Done
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value as TaskPriority
                )
              }
            >
              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="startDate">
              Start Date
            </label>

            <input
              id="startDate"
              type="text"
              value={startDate}
              onChange={(event) =>
                setStartDate(event.target.value)
              }
              placeholder="DDMMMYYYY"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">
              End Date
            </label>

            <input
              id="endDate"
              type="text"
              value={endDate}
              onChange={(event) =>
                setEndDate(event.target.value)
              }
              placeholder="DDMMMYYYY"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskEditPage;