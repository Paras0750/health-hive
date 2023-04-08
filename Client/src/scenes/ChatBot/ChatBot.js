import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/meal/askAI`, {
        method: "POST",
        body: JSON.stringify({ prompt: inputValue }),
        headers: {
          "Content-Type": "application/json",
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
      }}
    >
      <div style={{ textAlign: "center", margin: "40" }}>
        <h1 style={{ color: "#4caf50" }}>Hello! I am Chat Bot</h1>
        <p>Ask Me Anything</p>
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
      {response && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
