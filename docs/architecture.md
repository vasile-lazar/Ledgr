# Architecture

## Overview

Ledgr is a local-first personal-finance application. A React/Vite browser client communicates with an ASP.NET Core API. The API owns authentication, validation, persistence, budgets, transactions, statements, and analytics. Statement parsing is delegated to a Python FastAPI service, which extracts text from PDFs and asks a locally hosted Ollama model to produce structured transactions.

```text
Browser (React + TypeScript)
        │ HTTP/JSON and multipart uploads
        ▼
ASP.NET Core API (:5134)
   ├── JWT authentication and authorization
   ├── business logic and validation
   ├── Entity Framework Core / PostgreSQL
   └── HTTP calls to Python parsing service (:8000)
                                      │
                                      ├── pdfplumber for PDF tables
                                      └── Ollama (:11434), Llama 3.1 8B
```

PostgreSQL and Ollama use named Docker volumes so database data and downloaded model data survive container recreation.

## Main components

| Component | Location | Responsibility |
| --- | --- | --- |
| Frontend | `frontend/` | Authentication UI, statement upload/review, transactions, budgets, statements, dashboard, profile, and API client behavior |
| API | `backend/Ledgr.Api/` | HTTP controllers, JWT setup, CORS, Swagger in development, migrations, and dependency injection |
| Business logic | `backend/Ledgr.BusinessLogic/` | Authentication, statements, transactions, budgets, analytics, security, and orchestration |
| Domain | `backend/Ledgr.Domain/` | Entities, DTOs/models, and transaction/status enums |
| Data access | `backend/Ledgr.DataAccess/` | EF Core `DbContext` and PostgreSQL migrations |
| Ingestion service | `ingestion/` | FastAPI endpoints, PDF extraction, LLM prompting, structured output parsing |
| Infrastructure | `docker-compose.yml` and service Dockerfiles | Local orchestration of PostgreSQL, Ollama, parsing, API, and frontend |

## Statement workflow

1. The user pastes statement text or selects a PDF in the frontend.
2. The API receives the request through the statements controller.
3. The API calls the Python service's `/parse` or `/parse-pdf` endpoint.
4. For PDFs, `pdfplumber` extracts table rows and converts them to plain-text transaction lines.
5. The ingestion service prompts Ollama with a JSON schema and transaction rules.
6. Candidate transactions return to the browser through the API.
7. The user edits, removes, and reviews the candidates.
8. The frontend calls the API's `/api/statements/accept` endpoint.
9. Confirmed transactions are persisted in PostgreSQL and become available to transaction, budget, statement, and analytics views.

The review step is intentional: model output is treated as a draft and is not automatically saved.

## Runtime boundaries

- Browser-to-API communication uses the API URL configured by `VITE_API_URL`.
- API-to-ingestion communication uses `PythonServiceUrl`.
- Ingestion-to-Ollama communication uses `OLLAMA_HOST`.
- API-to-PostgreSQL communication uses `DEFAULT_CONNECTION`.
- Authentication is JWT bearer authentication. The frontend Axios provider attaches tokens and provides configurable refresh/failure hooks.

## Operational considerations

The stack is designed for local execution and has no required external LLM provider. Ollama is configured with an optional NVIDIA GPU reservation in Compose. The Compose `depends_on` declarations define startup ordering, but they do not replace application-level readiness checks.
