import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyMealPlans = () => {
  const user = useSelector((state) => state.user);
  const [mealPlans, setMealPlans] = useState({ templates: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates?apiKey=9919efef79a9459d8545a1d37fb9ecc4&hash=${user.spoonacularHash}`
        );
        const data = await response.json();
        setMealPlans(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <h1>My Meal Plans</h1>
      <p>Here are your meal plans:</p>
      {mealPlans.templates &&
        mealPlans.templates.map((template) => (
          <Link to={`/myMealPlans/${template.id}`} key={template.id}>
            <div>
              <h2>{template.name}</h2>
              <p>ID: {template.id}</p>
            </div>
          </Link>
        ))}
    </>
  );
};

export default MyMealPlans;
