# Frontend: Auth UI with React, Vite, Tailwind, and Zustand

A simple authentication frontend built with React + Vite, using Tailwind CSS for styling, Zustand for state management, and Axios for API communication. This app works with the backend NestJS auth API.

## Features

- Sign In & Sign Up forms with form validation using `react-hook-form` + `zod`
- JWT authentication via cookies (secure, httpOnly)
- Global auth state with Zustand (persisted with refresh logic)
- Protected routes using a custom route guard
- Responsive Tailwind-based UI

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- Zustand
- React Hook Form
- Zod
- Axios
- React Router

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/auth-ui
cd auth-ui
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development Server

```bash
pnpm dev
```

App will be available at: `http://localhost:5173`

### 4. Backend Requirements

Make sure the backend is running at `http://localhost:3000` and CORS is properly configured to allow credentials from the frontend origin.

## Authentication

This frontend supports **cookie-based authentication** by default.

### Production usage (default):

- Access and Refresh tokens are stored as cookies (`accessToken`, `refreshToken`)
- Axios requests use `withCredentials: true`

### Development or testing:

- You may also use token headers:

```http
Authorization: Bearer <access_token>
x-refresh-token: <refresh_token>
```

## Project Structure

```
/src
  /components       # Reusable components (e.g., Input, Button, Layout)
  /pages            # Route pages: SignIn, Register, Welcome
  /store            # Zustand auth store
  /lib              # Axios config, helpers
  /types            # Shared TS types (User, API responses, etc.)
  /validation       # Zod schemas for form validation
```

## Available Scripts

- `pnpm dev` - Start the Vite dev server
- `pnpm build` - Build the production app

## Notes

- Ensure cookies are set as httpOnly and secure on the backend in production.
- Use `hydrate()` in Zustand to restore user state via `/me` on app load.
