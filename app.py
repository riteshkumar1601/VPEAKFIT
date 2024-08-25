import numpy as np
from flask import Flask,request,jsonify,render_template
import pickle
#Create app
app = Flask(__name__)

#Load model
model = pickle.load(open("injury_model.pkl","rb"))

@app.route("/")
def Home():
    return render_template("index.html")

@app.route("/predict", methods = ["POST"])
def predict():
    input_features = [float(x) for x in request.form.values()]
    features = [np.array(input_features)]
    prediction = model.predict(features)
    if prediction == 1 : 
        prediction = "Pretty high chances of injury"
    else:
        prediction = "Very low chances of injury"
    return render_template("index.html",prediction_text = "Likelihood of injury : {}".format(prediction))

@app.route("/recommendations",methods = ["POST"])
def recommendations():
    from tips import recommender
    inputs = [str(x) for x in request.form.values()]
    prediction = recommender.generate_tips(inputs[0],inputs[1])
    return render_template("index.html",recommendations="Tips :\n {}".format(prediction))

if __name__ == "__main__":
    app.run(debug=True)
