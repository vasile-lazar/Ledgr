# Backend

## Projects

The .NET backend is a solution under `backend/backend.sln` with four principal projects:

- `Ledgr.Api` — ASP.NET Core web application and controllers.
- `Ledgr.BusinessLogic` — application services and interfaces.
- `Ledgr.Domain` — entities, DTOs/models, and enums.
- `Ledgr.DataAccess` — EF Core context and migrations.

The API targets `net10.0`, enables nullable reference types and implicit usings, and references JWT bearer authentication, EF Core, Npgsql, Swagger/OpenAPI, and `DotNetEnv`.

## Startup and dependency injection

`Program.cs` loads environment values from `../../.env`, requires `JWT_SECRET`, and configures:

- JSON string serialization for enums.
- JWT bearer authentication with issuer, audience, lifetime, and signing-key validation.
- Authorization middleware.
- Swagger/OpenAPI in development.
- A scoped `BusinessLogic` facade.
- An `HttpClient<BusinessLogic>` whose base address is `PythonServiceUrl`, defaulting to `http://localhost:8000/`.
- `LedgrDbContext` using the `DEFAULT_CONNECTION` PostgreSQL connection string.
- CORS for `http://localhost:5173`.

At startup, the API creates a scope and calls `Database.Migrate()`, applying pending migrations before serving requests.

## Application layers

Controllers obtain focused logic interfaces from the `BusinessLogic` facade. The codebase separates HTTP concerns from application behavior through interfaces for authentication, statements, transactions, budgets, and analytics. Domain models are used for request and response contracts rather than exposing controller-specific implementation details.

The business-logic area also contains security and structure-related code. Authentication stores password-derived values and salts on the user entity; JWT creation and validation are configured at the API boundary.

## Authentication

The authentication routes support registration, login, profile updates, and password changes. Authenticated controllers derive the current user ID from the JWT `NameIdentifier` claim. User-scoped operations pass that ID into the relevant logic service, which is the basis for per-user data isolation.

The frontend sends bearer tokens through its Axios provider. JWT issuer and audience default to `ledgr` when not supplied, while the signing secret is mandatory.

## Controller responsibilities

- `AuthController` — register, login, update profile, change password.
- `StatementController` — parse pasted text, parse uploaded PDFs, accept reviewed transactions, list statements.
- `TransactionController` — list the current user's transactions.
- `BudgetController` — list, create, update, and delete budgets.
- `AnalyticsController` — six-month income, six-month expense, and expense-by-category data.

## Local development

Run the API from `backend/Ledgr.Api` with:

```bash
dotnet run
```

The API expects the environment variables documented in [docker.md](docker.md), or equivalent local configuration. Swagger is enabled when the ASP.NET environment is `Development`.

## Error behavior

Controllers commonly translate unsuccessful business-logic results into `400 Bad Request`, use `401 Unauthorized` for failed login, and return `404 Not Found` for missing budgets. The ingestion service maps model connectivity, timeout, and malformed JSON failures into explicit HTTP errors before the API presents the result to the frontend.
