import React, { useState } from "react";
import initialData from "./data";
import Dish from "./Dish";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import "./recipe.css";

function Recipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (user === null) {
      navigate("/login");
    }

    fetch(`${BASE_URL}/meal/findRecipe`, {
      method: "POST",
      body: JSON.stringify({ searchTerm }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="RecipeContainer">
      <h1>Recipes</h1>
      <form onSubmit={handleSearchSubmit}>
        <div className="SearchContainer">
          <label htmlFor="search">Search for a recipe:</label>
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
          <button type="submit">Search</button>
        </div>
      </form>

      <div className="DishesContainer">
        {data.results && data.results.length > 0 ? (
          data.results.map((dish) => (
            <Link to={`/recipe/${dish.id}`} key={dish.id} className="DishLink">
              <Dish title={dish.title} image={dish.image} />
            </Link>
          ))
        ) : (
          <div>No results found.</div>
        )}
      </div>
    </div>
  );
}

export default Recipe;
