# Task Management App

A React + TypeScript task management application built with Redux Toolkit, Redux Thunk, Axios, and JSON Server.

## Features

- Add, edit, and delete tasks
- View task details
- Filter by Status, Priority, and Assigned To
- Sort by Title, Assigned To, Status, and Priority
- Pagination
- REST API integration

## Technologies

- React
- TypeScript
- Redux Toolkit / Redux Thunk
- React Router
- Axios
- JSON Server
- Vite

## Project Structure

```text
src/
├── components/
├── pages/
├── redux/
├── services/
├── types/
├── utils/
├── App.tsx
└── index.css

db.json
```

## API Integration

JSON Server is used as the local REST API and Axios is used for API communication.

```text
React Components
       ↓
Redux Thunks
       ↓
API Service
       ↓
Axios
       ↓
JSON Server
       ↓
db.json
```

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Setup

Install dependencies:

```bash
npm install
```

Start JSON Server:

```bash
npm run server
```

Start the React application in another terminal:

```bash
npm run dev
```

API:

```text
http://localhost:3001/tasks
```

## Build

```bash
npm run build
```

## Notes

- `db.json` is used for local task data.
- Run JSON Server before using CRUD operations.
- Do not include `node_modules` when submitting the project.