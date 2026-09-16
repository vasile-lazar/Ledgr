import pdfplumber


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts table rows from a PDF bank statement and reformats them
    as plain text lines matching the shape parse_statement() already
    expects — "DD/MM DESCRIPTION AMOUNT" — so the same prompt/schema
    logic works for both pasted text and PDF uploads.
    """
    lines = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                for row in table:
                    # Skip the header row and any empty rows
                    if not row or row[0] in (None, "Date"):
                        continue
                    date, description, amount = row[0], row[1], row[2]
                    lines.append(f"{date} {description} {amount} MDL")
    return "\n".join(lines)

