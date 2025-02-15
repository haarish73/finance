from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

rf_model = joblib.load("salary_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        age = data["age"]
        gender = data["gender"]
        education = data["education"]
        job_title = data["jobTitle"]
        experience = data["experience"]

        def encode_value(column, value):
            encoder = label_encoders[column]
            return encoder.transform([value])[0] if value in encoder.classes_ else -1  

        gender_encoded = encode_value("Gender", gender)
        education_encoded = encode_value("Education Level", education)
        job_title_encoded = encode_value("Job Title", job_title)

        input_data = np.array([[age, gender_encoded, education_encoded, job_title_encoded, experience]])
        predicted_salary = rf_model.predict(input_data)[0]

        return jsonify({"predicted_salary": predicted_salary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
