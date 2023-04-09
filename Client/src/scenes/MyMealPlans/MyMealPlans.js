import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyMealPlans = () => {
  const user = useSelector((state) => state.user);
  const [mealPlans, setMealPlans] = useState({ templates: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/meal/allMealPlans`, {
          method: "POST",
          body: JSON.stringify({ email: user.email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.error("Recieved Data:", data);
        setMealPlans(data.data);
        console.error("Set Data:", data);
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
