# Frontend

## Stack and commands

The frontend is a React 19 application written in TypeScript and bundled with Vite. Styling uses Tailwind CSS, charts use Recharts, icons use Heroicons and Lucide, forms use Zod validation in key pages, and HTTP communication uses Axios.

```bash
cd frontend
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

`npm run build` runs TypeScript project builds followed by the Vite production build.

## Application composition

`src/App.tsx` composes the application providers in this order:

1. `LoadingProvider`
2. `AxiosProvider`
3. `AuthProvider`
4. `ThemeProvider`
5. `Toaster`
6. `AppRoutes`

This gives routes and pages access to loading state, HTTP behavior, authentication, theme state, and toast notifications.

## Functional areas

- **Landing** — product introduction, feature explanation, theme toggle, login, and registration links.
- **Login/Register** — validated credential forms with navigation and toast feedback.
- **Dashboard** — overview information, income-versus-expense charts, monthly expense trends, and category breakdowns.
- **Upload** — pasted text or file upload, parsing progress, editable transaction review, removal of rows, and explicit save/accept.
- **Transactions** — searchable, category-filtered, sortable, paginated transaction table.
- **Statements** — uploaded statement history and navigation to create a new upload.
- **Budgets** — category-based budget creation and usage cards.
- **Profile** — profile editing and password change.
- **NotFound** — fallback route with navigation back to the dashboard.

## Routing and state

Routes are defined under `src/routes`. Authentication hooks and context provide the current user and login/register/logout operations. Feature hooks such as `useTransactions`, `useStatements`, `useBudgets`, `useDashboardData`, and `useProfile` keep page components focused on presentation and user interaction.

The application uses typed domain values, including a fixed transaction-category union matching the backend categories: `Groceries`, `Transport`, `Salary`, `Entertainment`, `Dining`, `Shopping`, `Utilities`, and `Other`.

## HTTP client

`src/axios` provides:

- An Axios context and `useAxios` hook.
- Configurable session, local, or in-memory token storage.
- A typed API wrapper for GET, POST, PUT, PATCH, DELETE, blob, and multipart upload requests.
- Bearer-header construction.
- Configurable 401 refresh behavior and authentication-failure callbacks.
- Optional request error notifications.

The API base URL defaults to `import.meta.env.VITE_API_URL`. In Compose it is set to `http://localhost:5134`, which is correct for a browser running on the host; browser requests should not use the internal Docker service name.

## UI conventions

Shared controls live in `src/components/ui`. Layouts, sections, constants, types, and hooks are separated into their respective directories. Dark/light theme behavior is centralized in `ThemeContext`, while pages use shared cards, tables, inputs, buttons, charts, and toast feedback.

## Security and data handling

The frontend does not save parsed statement results automatically. Upload results remain in page state until the user accepts them. Authentication tokens are managed through the configurable token-storage abstraction; choose storage appropriate to the deployment threat model rather than assuming browser storage is always suitable.
