import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../services/helper";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const sampleQueries = [
    "What are some healthy breakfast options?",
    "Can you suggest some vegetarian meal ideas?",
    "How much water should I drink in a day?",
    "What are some foods to avoid when trying to lose weight?",
    "Can you suggest some healthy snack options?",
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (query) => {
    setInputValue(query);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user === null) {
      navigate("/login");
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/meal/askAI`, {
        method: "POST",
        body: JSON.stringify({ prompt: inputValue }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setResponse(data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        minHeight: "500px",
        margin: "100px 80px",
      }}
    >
      <div style={{ textAlign: "center", margin: "40" }}>
        <h1 style={{ color: "#4caf50" }}>Hello! I am Chat Bot</h1>
        <p>Ask Me Anything</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {sampleQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(query)}
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "10px 20px",
              borderRadius: "20px",
              border: "1px solid #4caf50",
              outline: "none",
              marginRight: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {query}
          </button>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ask me anything about meal planning and health"
          style={{
            padding: "10px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            marginRight: "10px",
            flex: 1,
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
          }}
        >
          Send
        </button>
      </form>
      {isLoading && (
        <div style={{ textAlign: "center", margin: "30px" }}>
          <BeatLoader color="#36d7b7" />
        </div>
      )}
      {response &&
        response.split(/\n|<img/).map((line, index) =>
          line.startsWith(" src=") ? (
            <img
              key={index}
              src={line.slice(6, -1)}
              alt="related"
              width="300"
            />
          ) : line.startsWith("Meal plan page") ? (
            <button
              key={index}
              onClick={() => (window.location.href = `/myMealPlans`)}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                margin: "15px 20px",
              }}
            >
              Visit Meal Plan Page
            </button>
          ) : line.startsWith("Support page link:") ? (
            <button
              key={index}
              onClick={() => (window.location.href = `/support`)}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                margin: "15px 20px",
              }}
            >
              Visit Support Page
            </button>
          ) : (
            <p key={index}>{line}</p>
          )
        )}
    </div>
  );
}

export default App;
