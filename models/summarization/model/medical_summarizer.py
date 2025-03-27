import torch
from transformers import PegasusTokenizer, PegasusForConditionalGeneration
import PyPDF2
from docx import Document
import io
import pickle
import os

class MedicalSummarizer:
    def __init__(self):
        self.model_name = "google/pegasus-xsum"
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Using device: {self.device}")
        
        # Load tokenizer and model
        self.tokenizer = PegasusTokenizer.from_pretrained(self.model_name)
        self.model = PegasusForConditionalGeneration.from_pretrained(self.model_name)
        
        # Move model to GPU if available
        self.model.to(self.device)
        
    def read_pdf(self, pdf_file):
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    
    def read_docx(self, docx_file):
        doc = Document(docx_file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    
    def summarize(self, text):
        try:
            # Tokenize the text
            inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=1024)
            
            # Move inputs to the same device as the model
            inputs = {k: v.to(self.device) for k, v in inputs.items()}
            
            # Generate summary
            summary_ids = self.model.generate(
                **inputs,
                max_length=150,
                min_length=40,
                length_penalty=2.0,
                num_beams=4,
                do_sample=True,
                temperature=0.7
            )
            
            # Decode the summary
            summary = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)
            return summary
            
        except Exception as e:
            print(f"Error during summarization: {str(e)}")
            raise
    
    def process_file(self, file):
        try:
            # Get file extension
            file_extension = os.path.splitext(file.filename)[1].lower()
            
            # Read file content based on extension
            if file_extension == '.pdf':
                text = self.read_pdf(file)
            elif file_extension == '.docx':
                text = self.read_docx(file)
            else:
                raise ValueError("Unsupported file format. Please upload PDF or DOCX files.")
            
            # Generate summary
            summary = self.summarize(text)
            return summary
            
        except Exception as e:
            print(f"Error processing file: {str(e)}")
            raise

    def save_model(self, path):
        """Save the model and tokenizer to disk"""
        try:
            # Move model to CPU before saving
            self.model.to('cpu')
            
            model_data = {
                'model': self.model,
                'tokenizer': self.tokenizer,
                'device': self.device
            }
            
            with open(path, 'wb') as f:
                pickle.dump(model_data, f)
                
            # Move model back to original device
            self.model.to(self.device)
            
        except Exception as e:
            print(f"Error saving model: {str(e)}")
            raise
    
    @classmethod
    def load_model(cls, path):
        """Load the model and tokenizer from disk"""
        try:
            with open(path, 'rb') as f:
                model_data = pickle.load(f)
            
            instance = cls()
            instance.model = model_data['model']
            instance.tokenizer = model_data['tokenizer']
            instance.device = model_data.get('device', torch.device("cuda" if torch.cuda.is_available() else "cpu"))
            
            # Move model to appropriate device
            instance.model.to(instance.device)
            
            return instance
            
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise 