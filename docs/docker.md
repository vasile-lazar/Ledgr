# Docker

## Compose topology

`docker-compose.yml` defines five services:

| Service | Image/build | Host port | Role |
| --- | --- | --- | --- |
| `postgres` | `postgres:16` | `5432` | Persistent relational database |
| `ollama` | `ollama/ollama` | `11434` | Local LLM runtime and model storage |
| `python-service` | Built from `./ingestion` | `8000` | FastAPI PDF and LLM parsing service |
| `backend` | Built from `./backend` | `5134` | ASP.NET Core API |
| `frontend` | Built from `./frontend` | `5173` | Vite development frontend |

The internal service names are used for container-to-container traffic: `postgres`, `ollama`, and `python-service`.

## Startup

From the repository root:

```bash
docker compose up -d --build
```

The frontend is available at `http://localhost:5173`, the API at `http://localhost:5134`, the ingestion service at `http://localhost:8000`, PostgreSQL at `localhost:5432`, and Ollama at `http://localhost:11434`.

Useful lifecycle commands:

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f python-service
docker compose down
```

`docker compose down` preserves named volumes. To remove local database and model data as well:

```bash
docker compose down -v
```

## Environment variables

### Backend

- `JWT_SECRET` — required signing secret.
- `AUTH_PEPPER` — authentication-related secret passed by Compose.
- `PythonServiceUrl` — internal URL, configured as `http://python-service:8000`.
- `DEFAULT_CONNECTION` — PostgreSQL connection string using the `postgres` service name.
- `JWT_ISSUER` and `JWT_AUDIENCE` — optional; both default to `ledgr` in the API.

### Ingestion

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` — database connection values supplied to the parsing container.
- `OLLAMA_HOST` — configured as `http://ollama:11434`.
- `OLLAMA_MODEL` — optional model override; the Python code defaults to `llama3.1:8b`.

### Frontend

- `VITE_API_URL` — browser-visible API URL, configured as `http://localhost:5134`.

The Compose file currently contains development database credentials. Replace them with secrets for any shared or production environment and avoid committing sensitive `.env` values.

## Persistent volumes

- `ledgr_pgdata` mounts to `/var/lib/postgresql/data` and stores PostgreSQL data.
- `ledgr_ollama_data` mounts to `/root/.ollama` and stores downloaded Ollama models.

## GPU support

The Ollama service reserves one NVIDIA GPU through the Compose device configuration. GPU support depends on Docker Desktop/Linux Docker configuration, NVIDIA drivers, and the container runtime. The application can still be documented and developed without GPU acceleration, but model generation may be slower.

## Dockerfiles

- `backend/Dockerfile` builds and runs the .NET API.
- `ingestion/Dockerfile` packages the Python FastAPI service and its requirements.
- `frontend/Dockerfile` packages the Vite frontend.

The Compose build contexts are intentionally scoped to each service directory. Changes to source files or dependency manifests therefore require rebuilding the affected image when testing the Compose deployment.

## Readiness and troubleshooting

`depends_on` controls dependency startup order but does not guarantee that PostgreSQL or Ollama is ready to accept requests. If the API starts before the database, inspect logs and restart the service after dependencies become ready. If parsing fails, verify that Ollama is running, the configured model is available, and `OLLAMA_HOST` resolves from inside the Python container.
