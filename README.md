# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
- `pnpm preview` - Preview the built app

## Notes

- Ensure cookies are set as httpOnly and secure on the backend in production.
- Use `hydrate()` in Zustand to restore user state via `/me` on app load.

## License

MIT

---

Feel free to adjust the domain/API URLs and CORS settings based on your deployment setup.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
