import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./recipestyle.css";
import { BASE_URL } from "../../services/helper";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import FlexCenter from "../../components/FlexCenter";
import { useNavigate } from "react-router-dom";

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");

    setLoading(true);

    fetch(`${BASE_URL}/meal/recipeSearch`, {
      method: "POST",
      body: JSON.stringify({ recipeId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then(({ data }) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, [recipeId, token, navigate, user]);

  return (
    <section id="recipe">
      {loading ? (
        <FlexCenter margin="250px 0px">
          <CircularProgress />
          <div style={{ marginLeft: "20px" }}>Fetching Data...</div>
        </FlexCenter>
      ) : (
        <>
          <h1 class="h-primary">{recipe.title}:</h1>
          <img src={recipe.image} alt={recipe.title} />
          <ul>
            <li>
              <h3 class="h-tertiary">Ingredients:</h3>
            </li>
            <div class="content">
              {recipe.extendedIngredients &&
                recipe.extendedIngredients.map((item) => (
                  <p key={item.id}>
                    <div class="inner-content">
                      {" "}
                      <p class="p1">{`${item.amount} ${item.unit}`}</p>{" "}
                    </div>
                    <div class="inner-content">
                      <img
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                        alt={item.originalName}
                        style={{
                          height: "90px",
                          width: "100px",
                        }}
                      />
                    </div>
                    <div class="inner-content">
                      <p class="p2">{item.originalName}</p>
                    </div>
                  </p>
                ))}
            </div>

            <li>
              <h3 class="h-tertiary">Nutrition:</h3>
            </li>
            {recipe.nutrition && (
              <div class="page-wraper">
                <table>
                  <thead>
                    <tr>
                      <th>Nutrient</th>
                      <th>Amount</th>
                      <th>% Daily Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.nutrition.nutrients.map((nutrient) => (
                      <tr key={nutrient.name}>
                        <td>{nutrient.name}</td>
                        <td>{nutrient.amount}</td>
                        <td>{nutrient.percentOfDailyNeeds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <li>
              <h3 class="h-tertiary">Instructions:</h3>
            </li>
            <div class="page-wrap">
              <dl class="faq">
                {recipe.analyzedInstructions &&
                  recipe.analyzedInstructions[0].steps.map((step) => (
                    <dt key={step.number}>{step.step}</dt>
                  ))}
              </dl>
            </div>
          </ul>
        </>
      )}
    </section>
  );
};

export default SingleRecipe;
