import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../redux/store";
import { deleteTaskAsync  } from "../redux/tasks/taskslice";

type SortField =
  | "title"
  | "assignedTo"
  | "status"
  | "priority";

function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const tasks = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  // Sorting
  const [sortField, setSortField] =
    useState<SortField | null>(null);

  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Filters
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [assigneeFilter, setAssigneeFilter] =
    useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [
    statusFilter,
    priorityFilter,
    assigneeFilter,
    sortField,
    sortDirection,
  ]);

  const handleDelete = (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      dispatch(deleteTaskAsync (taskId));
    }
  };

  const handleEdit = (taskId: string) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesAssignee =
      assigneeFilter === "All" ||
      task.assignedTo === assigneeFilter;

    return (
      matchesStatus &&
      matchesPriority &&
      matchesAssignee
    );
  });

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => {
      if (!sortField) {
        return 0;
      }

      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();

      const comparison =
        valueA.localeCompare(valueB);

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    }
  );

  const totalPages = Math.ceil(
    sortedTasks.length / tasksPerPage
  );

  const startIndex =
    (currentPage - 1) * tasksPerPage;

  const paginatedTasks = sortedTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  const assignees = Array.from(
    new Set(tasks.map((task) => task.assignedTo))
  );

  const getStatusClass = (status: string) => {
    switch (status) {
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

  const getPriorityClass = (priority: string) => {
    switch (priority) {
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
    <div className="task-card">
      <h2>Tasks</h2>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="statusFilter">
            Status
          </label>

          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All</option>
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

        <div className="filter-group">
          <label htmlFor="priorityFilter">
            Priority
          </label>

          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="assigneeFilter">
            Assignee
          </label>

          <select
            id="assigneeFilter"
            value={assigneeFilter}
            onChange={(event) =>
              setAssigneeFilter(event.target.value)
            }
          >
            <option value="All">All</option>

            {assignees.map((assignee) => (
              <option
                key={assignee}
                value={assignee}
              >
                {assignee}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>
                <button
                  className="sort-button"
                  onClick={() =>
                    handleSort("title")
                  }
                >
                  Title
                  {sortField === "title" &&
                    (sortDirection === "asc"
                      ? " ↑"
                      : " ↓")}
                </button>
              </th>

              <th>
                <button
                  className="sort-button"
                  onClick={() =>
                    handleSort("assignedTo")
                  }
                >
                  Assigned To
                  {sortField === "assignedTo" &&
                    (sortDirection === "asc"
                      ? " ↑"
                      : " ↓")}
                </button>
              </th>

              <th>
                <button
                  className="sort-button"
                  onClick={() =>
                    handleSort("status")
                  }
                >
                  Status
                  {sortField === "status" &&
                    (sortDirection === "asc"
                      ? " ↑"
                      : " ↓")}
                </button>
              </th>

              <th>
                <button
                  className="sort-button"
                  onClick={() =>
                    handleSort("priority")
                  }
                >
                  Priority
                  {sortField === "priority" &&
                    (sortDirection === "asc"
                      ? " ↑"
                      : " ↓")}
                </button>
              </th>

              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTasks.map((task) => (
              <tr
                key={task.id}
                onClick={() =>
                  handleTaskClick(task.id)
                }
                style={{ cursor: "pointer" }}
              >
                <td>{task.title}</td>

                <td>{task.assignedTo}</td>

                <td>
                  <span
                    className={getStatusClass(
                      task.status
                    )}
                  >
                    {task.status}
                  </span>
                </td>

                <td>
                  <span
                    className={getPriorityClass(
                      task.priority
                    )}
                  >
                    {task.priority}
                  </span>
                </td>

                <td>{task.startDate}</td>

                <td>
                  {task.endDate || "Not completed"}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEdit(task.id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(task.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sortedTasks.length === 0 && (
        <p>No tasks found.</p>
      )}

      {/* Pagination */}
      {sortedTasks.length > 0 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskList;