import json
from fastapi import requests, FastAPI
from pydantic import BaseModel


OLLAMA_HOST = "http://localhost:11434"
MODEL_NAME = "llama3.1:8b"

TRANSACTION_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "date": {"type": "string"},
            "merchant": {"type": "string"},
            "amount": {"type": "number"},
            "category": {
                "type": "string",
                "enum": ["Groceries", "Transport", "Salary", "Entertainment",
                         "Dining", "Shopping", "Utilities", "Other"]
            }
        },
        "required": ["date", "merchant", "amount", "category"]
    }
}

PROMPT_TEMPLATE = """You extract transactions from bank statement text.

Dates in the input are in DD/MM format (day first, then month) — this is
Moldovan/European date format, NOT American MM/DD format.

Example input:
25/03 shop EXAMPLE store#4   -50.00 MDL

Example output:
[{{"date": "2026-03-25", "merchant": "Shop Example", "amount": -50.00, "category": "Shopping"}}]

Note on the date: "25/03" means day 25, month 03 (March) → "2026-03-25".
Do NOT interpret it as month 25 (impossible) or read month-first.

Note on merchant names: always output Title Case — capitalize the first
letter of each word, lowercase the rest (e.g. "KAUFLAND" -> "Kaufland",
"LinelLA nr3" -> "Linella Nr3"). Remove noise like "*TRIP", transaction IDs,
or store numbers where they don't add meaning, but keep store numbers that
distinguish locations (e.g. "Linella Nr3" can stay if it's a specific branch).

Note on categories: Kaufland, Linella, Nr1, Fidesco, Green Hills are Moldovan
grocery/supermarket chains -> category "Groceries".

Now extract transactions from this real statement text, applying the same
DD/MM -> YYYY-MM-DD conversion. Spending is negative, income/refunds are
positive.

Statement text:
{statement_text}
"""


class ParseRequest(BaseModel):
    statement_text: str


def parse_statement(statement_text: str) -> list[dict]:
    line_count = len([line for line in statement_text.strip().split("\n") if line.strip()])

    prompt = PROMPT_TEMPLATE.format(statement_text=statement_text) + f"""

IMPORTANT: The statement text above contains exactly {line_count} transaction lines.
Your output array must contain exactly {line_count} objects — one per line, in order.
Do not stop early. Do not skip any line.
"""

    response = requests.post(
        f"{OLLAMA_HOST}/api/generate",
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False,
            "format": TRANSACTION_SCHEMA,
            "options": {
                "num_predict": -1
            }
        },
    )
    if not response.ok:
        print(f"Ollama returned {response.status_code}: {response.text}")
    response.raise_for_status()

    raw_output = response.json()["response"]

    try:
        parsed = json.loads(raw_output)
    except json.JSONDecodeError as e:
        print("FAILED TO PARSE AS JSON. Raw model output was:")
        print(raw_output)
        raise e

    if len(parsed) != line_count:
        print(f"WARNING: expected {line_count} transactions, got {len(parsed)}")

    return parsed
