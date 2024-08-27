import React, { useState } from "react";
import "./UserInjuryInput.css";

const UserInjuryInput = () => {
  const [user, setUser] = useState({
    age: "",
    weight: "",
    height: "",
    injuryStatus: "",
    traningIntensity: "",
    recoveryTime: "",
    goal: "",
    targetArea: "",
  });

  const [prediction, setPrediction] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(user).toString(),
      });

      const result = await response.json();
      setPrediction(result.prediction || "Error fetching prediction");
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error fetching prediction");
    }
  };

  const handleRecommendations = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(user).toString(),
      });

      const result = await response.json();
      setRecommendations(result.tips || "Error fetching recommendations");
    } catch (error) {
      console.error("Error:", error);
      setRecommendations("Error fetching recommendations");
    }
  };

  return (
    <>
      <section className="main-container">
        <h1 className="calculate-title">Injury Risk</h1>
        <div className="calculate-content">
          <form
            onSubmit={handlePredict}
            className="calculate-diet"
            id="calculate-diet"
          >
            <div className="calculate-group">
              <label>
                Age <span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="age"
                value={user.age}
                onChange={handleInputs}
                className="input-box"
                type="number"
                min="1"
                max="120"
                id="age"
                placeholder="Age in years"
                required
              />
            </div>

            <div className="calculate-group">
              <label>
                Weight <span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="weight"
                value={user.weight}
                onChange={handleInputs}
                className="input-box"
                type="number"
                min="1"
                max="200"
                id="weight"
                placeholder="Weight in KG"
                required
              />
            </div>

            <div className="calculate-group">
              <label>
                Height <span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="height"
                value={user.height}
                onChange={handleInputs}
                className="input-box"
                id="height"
                placeholder="Height in m"
                required
              />
            </div>

            <div className="calculate_injury_group">
              <label>
                Injury Status <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="input-box"
                name="injuryStatus"
                value={user.injuryStatus}
                onChange={handleInputs}
                id="injuryStatus"
                required
              >
                <option value="">-Select- Have you had injuries before</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="calculate-group">
              <label>
                Training Intensity <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="input-box"
                name="traningIntensity"
                value={user.traningIntensity}
                onChange={handleInputs}
                id="traningIntensity"
                required
              >
                <option value="">-Select- .. time required to recover injury</option>
                <option value="0">0 to 1 hours</option>
                <option value="1">1 to 2 hours</option>
                <option value="2">4+ hours </option>
              </select>
            </div>

            <div className="calculate-group">
              <label>
                Recovery Time <span style={{ color: "red" }}>*</span>
              </label>
              <select
                required
                className="input-box"
                name="recoveryTime"
                id="recoveryTime"
                value={user.recoveryTime}
                onChange={handleInputs}
              >
                <option value="">-Select-</option>
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
              </select>
            </div>

            <button type="submit" className="button">
              Predict
            </button>
          </form>

          {prediction && <p className="result">{prediction}</p>}
        </div>

        <h1 className="calculate-title">Tips to prevent injury</h1>
        <div className="calculate-content">
          <form
            onSubmit={handleRecommendations}
            className="calculate-diet"
            id="calculate-diet"
          >
            <div className="calculate-group">
              <label>
                Goal <span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="goal"
                value={user.goal}
                onChange={handleInputs}
                className="input-box"
                type="text"
                placeholder="Goal"
                required
              />
            </div>

            <div className="calculate-group">
              <label>
                Target area <span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="targetArea"
                value={user.targetArea}
                onChange={handleInputs}
                className="input-box"
                type="text"
                placeholder="Target area"
                required
              />
            </div>

            <button type="submit" className="button">
              Get Recommendations
            </button>
          </form>

          {recommendations && <p className="result">{recommendations}</p>}
        </div>
      </section>
    </>
  );
};

export default UserInjuryInput;
