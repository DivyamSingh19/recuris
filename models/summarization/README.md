# Medical Report Summarizer

This application provides a web interface for summarizing medical reports using the Pegasus-X model. It supports both PDF and DOCX file formats.

## Features

- Upload PDF or DOCX medical reports
- Automatic text extraction from documents
- AI-powered summarization using Pegasus-X model
- Simple and intuitive web interface
- Real-time processing and response

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
cd server
python app.py
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## Usage

1. Click the "Choose File" button or drag and drop a PDF or DOCX file
2. Click "Generate Summary"
3. Wait for the processing to complete
4. View the generated summary

## Technical Details

- The application uses the Pegasus-X model for summarization
- Supports PDF files using PyPDF2
- Supports DOCX files using python-docx
- Frontend built with vanilla JavaScript and CSS
- Backend built with Flask
- CORS enabled for cross-origin requests

## Error Handling

The application includes error handling for:
- Invalid file formats
- File upload failures
- Server connection issues
- Processing errors

## Note

The first run will download the Pegasus-X model, which may take some time depending on your internet connection. 