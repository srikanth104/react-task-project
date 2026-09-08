import { useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux/store";
import { createTaskAsync } from "../redux/tasks/taskslice";
import type {
  TaskPriority,
  TaskStatus,
} from "../types/task";
import { formatDate } from "../utils/dateutils";

function AddTaskForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] =
    useState<TaskStatus>("Open");
  const [priority, setPriority] =
    useState<TaskPriority>("Medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

    if (!startDate) {
      alert("Start Date is required");
      return;
    }

    if (endDate && endDate < startDate) {
      alert(
        "End Date cannot be before Start Date"
      );
      return;
    }

    const newTask = {
      id: "",
      title: title.trim(),
      assignedTo: assignedTo.trim(),
      status,
      priority,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    dispatch(createTaskAsync(newTask));

    // Clear form after successful submission
    setTitle("");
    setAssignedTo("");
    setStatus("Open");
    setPriority("Medium");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="form-card">
      <h2>Add Task</h2>

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
            placeholder="Enter task title"
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
            placeholder="user@example.com"
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
            <option value="Open">Open</option>
            <option value="In-Progress">
              In-Progress
            </option>
            <option value="Under-review">
              Under-review
            </option>
            <option value="Done">Done</option>
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
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startDate">
            Start Date
          </label>

          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(event) =>
              setStartDate(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">
            End Date
          </label>

          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(event) =>
              setEndDate(event.target.value)
            }
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;