import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState({});

  const { recipeId } = useParams();

  useEffect(() => {
    fetch(
      //   `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=d530179012ee4e238dd9730c30f0783a`
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=d530179012ee4e238dd9730c30f0783a&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error(error));
  }, [recipeId]);

  return (
    <>
      {/* {console.log(recipe.title && recipe.extendedIngredients[0](nameClean,amount,unit))} */}

      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />

      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients &&
          recipe.extendedIngredients.map((item) => {
            return (
              <li>
                {item.nameClean} <br />
                {item.unit === item.measures.metric.unitShort
                  ? item.amount + " " + item.unit
                  : item.measures.metric.amount +
                    " " +
                    item.measures.metric.unitShort +
                    "/" +
                    item.amount +
                    " " +
                    item.unit}
              </li>
            );
          })}
      </ul>
      <h3>Instructions:</h3>
      <ul>
        {recipe.analyzedInstructions &&
          recipe.analyzedInstructions[0].steps.map((item,index) => {
            return  <li>Step {item.number}: {item.step}</li>;
          })}
      </ul>
      {recipe.analyzedInstructions &&
        console.log(recipe.analyzedInstructions[0].steps[0].step)}
    </>
  );
};

export default SingleRecipe;
