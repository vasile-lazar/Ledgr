# Database

## Database engine and connection

Ledgr uses PostgreSQL 16 in the default Docker Compose topology. The API connects through Entity Framework Core and Npgsql using the `DEFAULT_CONNECTION` environment variable.

The Compose defaults are:

```text
Host=postgres
Port=5432
Database=ledgr_db
Username=ledgr_user
Password=ledgr_password
```

These values are suitable for the internal Compose network. A host-run API should use `localhost` instead of `postgres`.

## Entity Framework Core context

`Ledgr.DataAccess.Context.LedgrDbContext` exposes these sets:

- `Users` — `UserEntity`.
- `Transactions` — `TransactionEntity`.
- `Budgets` — `BudgetEntity`.
- `Statements` — `StatementEntity`.

The context currently has an empty `OnModelCreating`, so most mapping comes from data annotations and EF Core conventions. Migrations are stored under `backend/Ledgr.DataAccess/Migrations`.

## Entities

### Users

`UserEntity` contains an identity integer ID, username, email, password hash, salt, creation timestamp, and account status. Username is limited to 50 characters and email is annotated as an email address.

### Transactions

`TransactionEntity` contains the owning `UserId`, date, merchant, amount, category, and creation timestamp. Merchant is limited to 100 characters. Amount sign follows the ingestion convention: spending is negative and income/refunds are positive.

### Budgets

`BudgetEntity` contains a category, amount limit, used amount, date, and owning `UserId`. It has a navigation property to the user and uses the transaction-category enum for its category.

### Statements

`StatementEntity` records a file path or source label, statement date, transaction count, and owning `UserId`. Pasted text can be represented by a non-file source label in the UI.

## Relationships and isolation

Transactions, budgets, and statements reference users through `UserId` and navigation properties. Controller operations resolve the current user from the JWT claim and pass that ID into business logic. This is the application-level boundary for per-user history and budget data; queries and mutation logic should continue to enforce that ownership condition.

## Categories and dates

The backend serializes enums as strings for JSON clients. The frontend and ingestion schema currently share eight category values:

```text
Groceries, Transport, Salary, Entertainment,
Dining, Shopping, Utilities, Other
```

Entities use `DateOnly` for transaction, budget, and statement dates. Ingestion converts statement `DD/MM` values to ISO dates using the supplied default year.

## Migrations and lifecycle

Pending migrations are automatically applied by the API during startup with `Database.Migrate()`. This is convenient for local development and Compose startup. For production deployments, consider running migrations as a separate controlled release step, using non-default credentials, and adding explicit database readiness handling.

PostgreSQL data is persisted in the `ledgr_pgdata` named volume. Removing that volume deletes the local database contents.
