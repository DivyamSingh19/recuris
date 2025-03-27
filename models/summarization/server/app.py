from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
from medical_summarizer import MedicalSummarizer

app = Flask(__name__)
CORS(app)

# Initialize the model
model_path = os.path.join(os.path.dirname(__file__), 'medical_summarizer.pkl')
if os.path.exists(model_path):
    summarizer = MedicalSummarizer.load_model(model_path)
else:
    summarizer = MedicalSummarizer()
    summarizer.save_model(model_path)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Process the file and get summary
        summary = summarizer.process_file(file)
        
        return jsonify({
            'success': True,
            'summary': summary
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 