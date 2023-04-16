import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/helper"

const MyMealPlans = () => {
  const user = useSelector((state) => state.user);
  const [mealPlans, setMealPlans] = useState({ templates: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/meal/allMealPlans`,
          {
            method: "POST",
            body: JSON.stringify({ email: user.email }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        setMealPlans(data.data);
        console.error("Set Data:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [user]);

  const handleClick = async (id) => {
    console.log("MEAL PLANS: ",mealPlans);
    try {
      const response = await fetch(
        `${BASE_URL}/meal/deleteMealPlan`,
        {
          method: "POST",
          body: JSON.stringify({ user: user, id: id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("SUCCESS!");
      }
      setMealPlans((prev) => ({
        ...prev,
        templates: prev.templates.filter((template) => template.id !== id),
      }));

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>My Meal Plans</h1>
      <p>Here are your meal plans:</p>
      {mealPlans.templates &&
        mealPlans.templates.map((template) => (
          <div key={template.id}>
            <Link to={`/myMealPlans/${template.id}`}>
              <h2>{template.name}</h2>
              <h3>ID: {template.id}</h3>
            </Link>
            <button
              style={{ color: "red" }}
              onClick={() => handleClick(template.id)}
            >
              X
            </button>
            <br />
            <br />
          </div>
        ))}
    </>
  );
};

export default MyMealPlans;
