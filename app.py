import numpy as np
from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

# Enable CORS for all routes

# Create app
app = Flask(__name__)
CORS(app)
# Load model
model = pickle.load(open("injury_model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Extract data from the request
        data = request.form
        input_features = [float(data[key]) for key in ["age", "weight", "height", "injuryStatus", "traningIntensity", "recoveryTime"]]
        features = [np.array(input_features)]

        # Make prediction
        prediction = model.predict(features)
        
        # Determine prediction result
        result = "Pretty high chances of injury" if prediction == 1 else "Very low chances of injury"
        
        # Return JSON response
        return jsonify({"prediction": result})
    
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/recommendations", methods=["POST"])
def recommendations():
    try:
        from tips import recommender
        
        # Extract data from the request
        data = request.form
        goal = data.get("goal", "")
        target_area = data.get("targetArea", "")
        
        # Generate recommendations
        tips = recommender.generate_tips(goal, target_area)
        
        # Return JSON response
        return jsonify({"tips": tips})
    
    except Exception as e:
        return jsonify({"error": str(e)})
@app.route("/dietplan", methods=["POST"])
def dietplan():
    pass
@app.route("/exerciseplan", methods=["POST"])
def exerciseplan():
    pass
if __name__ == "__main__":
    app.run(debug=True)
