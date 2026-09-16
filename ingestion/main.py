import json
import tempfile
import requests
import llm
import pdf_extraction
from fastapi import FastAPI, HTTPException, UploadFile, File


app = FastAPI()

@app.post("/parse")
def parse_endpoint(req: llm.ParseRequest):
    try:
        transactions = llm.parse_statement(req.statement_text)
    except requests.exceptions.ConnectionError:
        raise HTTPException(
            status_code=503,
            detail="The AI model is unavailable — check that Ollama is running.",
        )
    except requests.exceptions.Timeout:
        raise HTTPException(
            status_code=504,
            detail="The AI model took too long to respond. Try again.",
        )
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail="The AI model returned an unparseable response. Try again.",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parsing failed: {str(e)}")

    return {"transactions": transactions}


@app.post("/parse-pdf")
async def parse_pdf_endpoint(file: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        statement_text = pdf_extraction.extract_text_from_pdf(tmp_path)
        if not statement_text.strip():
            raise HTTPException(status_code=422, detail="No transaction table found in PDF.")

        transactions = llm.parse_statement(statement_text)
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="The AI model is unavailable — check that Ollama is running.")
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="The AI model took too long to respond. Try again.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="The AI model returned an unparseable response. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parsing failed: {str(e)}")

    return {"transactions": transactions}


@app.get("/health")
def health():
    return {"status": "ok"}
