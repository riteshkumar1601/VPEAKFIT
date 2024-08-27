import numpy as np
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
from diet import rate_meal
import os
import pickle

# Create app
app = Flask(__name__)

# Define upload folder and allowed extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Load model
model = pickle.load(open("injury_model.pkl", "rb"))

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def Home():
    return render_template("index.html")
@app.route("/exerciser")
def exercise_page():
    # Render the exercise.html template
    return render_template("exercise.html")

@app.route("/dietr")
def diet_page():
    # Render the diet.html template
    return render_template("diet.html")

@app.route("/predict", methods=["POST"])
def predict():
    input_features = [float(x) for x in request.form.values()]
    features = [np.array(input_features)]
    prediction = model.predict(features)
    if prediction == 1:
        prediction = "Pretty high chances of injury"
    else:
        prediction = "Very low chances of injury"
    return render_template("index.html", prediction_text="Likelihood of injury: {}".format(prediction))

@app.route("/recommendations", methods=["POST"])
def recommendations():
    from tips import recommender
    inputs = [str(x) for x in request.form.values()]
    prediction = recommender.generate_tips(inputs[0], inputs[1])
    return render_template("index.html", recommendations="Tips:\n {}".format(prediction))

@app.route("/exercise", methods=["POST"])
def exercise():
    from exercise import exerciser
    inputs = [str(x) for x in request.form.values()]
    prediction = exerciser(inputs[0], inputs[1], inputs[2], inputs[3])
    return render_template("exercise.html", recommendations="Tips:\n {}".format(prediction))

@app.route("/diet", methods=["POST"])
def diet():
    if 'image' not in request.files:
        return "No image file part", 400

    file = request.files['image']
    if file.filename == '':
        return "No selected file", 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)

        # Extract other form fields
        age = request.form.get('age')
        weight = request.form.get('weight')
        goal = request.form.get('goal')
        profession = request.form.get('profession')

        # Call rate_meal function
        prediction = rate_meal(image_path, age, weight, goal, profession)
        return render_template("diet.html", recommendations="Tips:\n {}".format(prediction), bmi_result=request.form.get('bmi_result'))

    return "Invalid file format", 400


    return "Invalid file format", 400

@app.route("/bmi_check", methods=["POST"])
def bmi_check():
    from diet import bmi
    weight = float(request.form.get('weight2'))
    height = float(request.form.get('height'))

    # Call bmi function
    bmi_result = bmi(weight, height)
    return render_template("diet.html", bmi_result="BMI Tips:\n {}".format(bmi_result), recommendations=request.form.get('recommendations'))


if __name__ == "__main__":
    app.run(debug=True)
