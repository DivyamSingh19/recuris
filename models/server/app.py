from flask import Flask, request, jsonify
from models.insights.model import insights
from models.summarization.model import summarization

app = Flask(__name__)

 
model1 = insights()
model2 = summarization()

 

@app.route('/')
def home():
    return "Flask server with multiple models"

 
@app.route('/insights', methods=['POST'])
def predict():
    data = request.json
    X = data.get("X", [])
    if not X:
        return jsonify({"error": "No input data provided"}), 400
    prediction = model1.predict([X])  
    return jsonify({"prediction": prediction})

 
@app.route('/summarization', methods=['POST'])
def chat():
    data = request.json
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "No text provided"}), 400
    response = model2.get_response(text)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
