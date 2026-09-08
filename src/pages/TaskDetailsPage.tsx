import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import type { RootState } from "../redux/store";

function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(
      (task) => task.id === id
    )
  );

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

  const getStatusClass = () => {
    switch (task.status) {
      case "Open":
        return "status-badge status-open";

      case "In-Progress":
        return "status-badge status-progress";

      case "Under-review":
        return "status-badge status-review";

      case "Done":
        return "status-badge status-done";

      default:
        return "status-badge";
    }
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case "Low":
        return "priority-badge priority-low";

      case "Medium":
        return "priority-badge priority-medium";

      case "High":
        return "priority-badge priority-high";

      default:
        return "priority-badge";
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <h1>Task Details</h1>

        <p>
          View complete task information.
        </p>
      </header>

      <div className="form-card">
        <h2>{task.title}</h2>

        <div className="form-group">
          <label>Assigned To</label>
          <span>{task.assignedTo}</span>
        </div>

        <div className="form-group">
          <label>Status</label>

          <span className={getStatusClass()}>
            {task.status}
          </span>
        </div>

        <div className="form-group">
          <label>Priority</label>

          <span className={getPriorityClass()}>
            {task.priority}
          </span>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <span>{task.startDate}</span>
        </div>

        <div className="form-group">
          <label>End Date</label>

          <span>
            {task.endDate || "Not completed"}
          </span>
        </div>

        <div className="form-actions">
          <button
            className="primary-button"
            onClick={() => navigate("/")}
          >
            Back to Tasks
          </button>

          <button
            className="secondary-button"
            onClick={() =>
              navigate(`/tasks/${task.id}/edit`)
            }
          >
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsPage;