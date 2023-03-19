import React, { useState } from "react";

function Recipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.api-ninjas.com/v1/recipe?query=${searchTerm}`, {
      headers: {
        "X-Api-Key": "W2iFKbMiQ72Jkdqaby1LUA==V5HU03xo3KT83IDA",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
      <h1>API Data:</h1>
      {console.log(data)}
      <ul>
        {data.map((item) => (
          <div style={{margin: 10}}>
            <li key={item.id}>{item.title}</li>
            <ul>
                <li>Ingredients: <br />{item.ingredients}</li>
                <li>Instructions: <br />{item.instructions}</li>
                <li>Servings: <br />{item.servings}</li>
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;
