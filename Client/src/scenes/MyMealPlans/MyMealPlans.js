import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import "./myMeal.css";
import { CircularProgress } from "@mui/material";
import FlexCenter from "../../components/FlexCenter";

const MyMealPlans = () => {
  const user = useSelector((state) => state.user);
  const [mealPlans, setMealPlans] = useState({ templates: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/meal/allMealPlans`, {
          method: "POST",
          body: JSON.stringify({ email: user.email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
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
    console.log("MEAL PLANS: ", mealPlans);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/meal/deleteMealPlan`, {
        method: "POST",
        body: JSON.stringify({ user: user, id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("SUCCESS!");
      }

      setMealPlans((prev) => ({
        ...prev,
        templates: prev.templates.filter((template) => template._id !== id),
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      navigate("/myMealPlans");
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: "400px" }}>
      <h1 className="title">My Meal Plans</h1>
      {loading ? (
        <div style={{ margin: "60px 0px" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <p className="subtitle">Here are your meal plans:</p>
          {mealPlans.templates &&
            mealPlans.templates.map((template) => (
              <div key={template.id} className="card">
                <FlexCenter>
                  <Link to={`/myMealPlans/${template.id}`}>
                    <h2>{template.name}</h2>
                  </Link>
                  <button onClick={() => handleClick(template.id)}>
                    Remove Meal Plan
                  </button>
                </FlexCenter>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default MyMealPlans;
