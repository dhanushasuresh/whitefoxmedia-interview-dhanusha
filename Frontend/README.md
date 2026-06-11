# School Management System Frontend

This is the React frontend for the Student Management Module.

## Requirements

- Node.js 18+
- npm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file from `.env` or edit `VITE_API_BASE_URL` to point to your backend.

## Running the frontend

```bash
npm run dev
```

Open the provided local URL in your browser.

## Environment Variables

- `VITE_API_BASE_URL` - base API URL for the backend, e.g. `http://localhost:8000/api`

## Features

- JWT authentication
- Login page with form validation and password toggle
- Dashboard with total students and quick navigation
- Responsive student list with search, pagination, edit, and delete
- Add and edit student forms with validation

## Deployment

- Build the app:

```bash
npm run build
```

- Deploy the generated `dist` folder to Vercel or any static hosting.

- In Vercel, set the environment variable `VITE_API_BASE_URL` to your backend API URL.
