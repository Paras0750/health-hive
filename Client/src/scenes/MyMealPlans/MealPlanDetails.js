import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./meal.css";

const MealPlanDetails = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [weekPlan, setWeekPlan] = useState({ id: null, name: "", days: [] });

  useEffect(() => {
    const fetchMealPlanDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/meal/weekPlan`, {
          method: "POST",
          body: JSON.stringify({ id: id, email: user.email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Recieved Data:", data);
        setWeekPlan(data.data);
      } catch (error) {
        console.error("Error fetching meal plan details:", error);
      }
    };

    fetchMealPlanDetails();
  }, [id, user.email]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="meal-plan-details">
      <h1>Meal Plan Details</h1>
      <div className="meal-plan-container">
        <div className="meal-plan-row">
          <div className="meal-plan-cell"></div>
          {daysOfWeek.map((day) => (
            <div key={day} className="meal-plan-cell meal-plan-header">
              {day}
            </div>
          ))}
        </div>
        {["Breakfast", "Lunch", "Dinner"].map((meal, i) => (
          <div key={i} className="meal-plan-row">
            <div className="meal-plan-cell meal-plan-header">{meal}</div>
            {Array.isArray(weekPlan.days) &&
              weekPlan.days.map((day, j) => {
                if (day && day.items[i] && day.items[i].type === "RECIPE") {
                  const nutrients =
                    i === 0
                      ? day.nutritionSummaryBreakfast.nutrients
                      : i === 1
                      ? day.nutritionSummaryLunch.nutrients
                      : i === 2
                      ? day.nutritionSummaryDinner.nutrients
                      : [];
                  const carb = nutrients.find(
                    (nutrient) => nutrient.name === "Carbohydrates"
                  );
                  const fat = nutrients.find(
                    (nutrient) => nutrient.name === "Fat"
                  );
                  const protein = nutrients.find(
                    (nutrient) => nutrient.name === "Protein"
                  );
                  return (
                    <div key={`${j}-${i}`} className="meal-plan-cell">
                      <p>{day.items[i].value.title}</p>
                      <p>
                        Carbohydrates: {carb?.amount} {carb?.unit}
                      </p>
                      <p>
                        Fat: {fat?.amount} {fat?.unit}
                      </p>
                      <p>
                        Protein: {protein?.amount} {protein?.unit}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={`${j}-${i}`} className="meal-plan-cell"></div>
                  );
                }
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanDetails;
