import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./recipestyle.css";
import { Avatar } from "@material-ui/core";

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

      <section id="recipe">
        <h1 class="h-primary">{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />

        <div class="content">
          <h3 class="h-tertiary">Ingredients:</h3>
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {recipe.extendedIngredients &&
                recipe.extendedIngredients.map((item) => {
                  return (
                    <tr>
                      <td>
                        {
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                            alt=""
                            style={{
                              height: "50px",
                              width: "45px"
                            }}
                          />
                        }
                        {item.nameClean}
                      </td>
                      <td>
                        {item.unit === item.measures.metric.unitShort
                          ? item.amount + " " + item.unit
                          : item.measures.metric.amount +
                            " " +
                            item.measures.metric.unitShort +
                            "/" +
                            item.amount +
                            " " +
                            item.unit}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div class="page-wrap">
            <h3 class="h-tertiary">Instructions:</h3>
            <dl class="faq">
              {recipe.analyzedInstructions &&
                recipe.analyzedInstructions[0].steps.map((item, index) => {
                  return <dt>{item.step}</dt>;
                })}
            </dl>
          </div>
        </div>
      </section>
      {recipe.analyzedInstructions &&
        console.log(recipe.analyzedInstructions[0].steps[0].step)}
    </>
  );
};

export default SingleRecipe;