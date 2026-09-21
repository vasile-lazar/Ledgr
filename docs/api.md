# API

The public application API is the ASP.NET Core service, normally available at `http://localhost:5134`. Routes are grouped under `/api`. Protected operations require a JWT bearer token unless noted otherwise.

## Authentication

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Create an account |
| POST | `/api/auth/login` | No | Authenticate and receive login data |
| PUT | `/api/auth/profile` | Yes | Update the current user's profile |
| POST | `/api/auth/change-password` | Yes | Change the current user's password |

Registration and login accept the corresponding auth DTOs. Failed registration/profile/password operations generally return `400`; failed login returns `401`.

## Statements and parsing

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/statements/upload/text` | Application route | Parse pasted statement text |
| POST | `/api/statements/upload/pdf` | Application route | Parse an uploaded PDF statement |
| POST | `/api/statements/accept` | Application route | Persist reviewed transactions |
| GET | `/api/statements` | Application route | List the current user's statements |

The text upload DTO contains statement text. The PDF route accepts an uploaded form file. The accept route receives the reviewed transaction DTO collection from the frontend. The controller derives the current user from the JWT claim before invoking business logic.

## Transactions

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/transactions` | Application route | Return the current user's transactions |

The frontend performs search, category filtering, sorting, and pagination for the transaction table.

## Budgets

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/budget` | Application route | Get last-month/current budget data exposed by business logic |
| POST | `/api/budget/create` | Application route | Create a category budget |
| PATCH | `/api/budget/update/{id}` | Application route | Update a budget owned by the user |
| DELETE | `/api/budget/delete/{id}` | Application route | Delete a budget owned by the user |

Missing budgets are reported as `404` for update and delete; other unsuccessful operations are generally `400`.

## Analytics

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/analytics/income` | Application route | Income for the last six months |
| GET | `/api/analytics/expense` | Application route | Expenses for the last six months |
| GET | `/api/analytics/category` | Application route | Expenses grouped by category |

## Python ingestion service

The FastAPI service listens on port `8000` and exposes:

| Method | Path | Request | Response |
| --- | --- | --- | --- |
| POST | `/parse` | JSON `{ "statement_text": string, "default_year": number }` | `{ "transactions": [...] }` |
| POST | `/parse-pdf` | Multipart `file` and form `default_year` | `{ "transactions": [...] }` |
| GET | `/health` | None | `{ "status": "ok" }` |

Each transaction is constrained to `date`, `merchant`, `amount`, and one of the eight supported categories. The prompt specifies European `DD/MM` dates, merchant normalization, local grocery recognition, and negative spending/positive income semantics.

The ingestion service maps common failures as follows:

- `503` — Ollama/model unavailable.
- `504` — model request timed out.
- `502` — model response was not valid JSON.
- `422` — PDF contained no transaction table.
- `500` — other parsing failures.

## Browser integration

The frontend uses `VITE_API_URL` as the API base URL. Axios adds the bearer token and supports multipart uploads for PDF statements. The API allows the development origin `http://localhost:5173` through its configured CORS policy.

Swagger/OpenAPI is registered by the API and exposed in development through the standard Swagger middleware.
