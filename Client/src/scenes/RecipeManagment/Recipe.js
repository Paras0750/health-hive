import { Paper } from "@mui/material";
import React, { useState } from "react";
import initialData from "./data";
import Dish from "./Dish";
import { Link } from "react-router-dom";

function Recipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(initialData);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=d530179012ee4e238dd9730c30f0783a&number=50&query=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Recipies</h1>
      <form style={{ textAlign: "center" }} onSubmit={handleSearchSubmit}>
        <label for="search">
          <strong fontWeight="400px">Search for a recipe:</strong>
        </label>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>

      <Paper
        sx={{
          margin: "20px 30px",
          padding: "40px 50px",
          border: "1px solid gray",
        }}
      >
        {data.results.map((dish) => (
          <Link to={`/recipe/${dish.id}`}>
            <Dish
              title={dish.title}
              image={dish.image}
              id={dish.id}
              key={dish.id}
            ></Dish>
          </Link>
        ))}
      </Paper>
    </div>
  );
}

export default Recipe;
