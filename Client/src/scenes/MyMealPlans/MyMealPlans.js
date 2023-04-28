import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import "./myMeal.css";
import { CircularProgress } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";

const MyMealPlans = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
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
            Authorization: `Bearer ${token}`,
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
  }, [user, token]);

  const handleClick = async (id) => {
    console.log("MEAL PLANS: ", mealPlans);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/meal/deleteMealPlan`, {
        method: "POST",
        body: JSON.stringify({ user: user, id: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    <div style={{ minHeight: "400px",padding: "2% 3%" }}>
  <h1 className="title" style={{ marginBottom: "20px" }}>My Meal Plans</h1>
  {loading ? (
    <div style={{ margin: "60px 0px" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      <p className="subtitle" style={{ marginBottom: "20px" }}>
        Here are your meal plans:
      </p>
      {mealPlans.templates &&
        mealPlans.templates.map((template) => (
          <div key={template.id} className="card" style={{ marginBottom: "20px" }}>
            <FlexBetween style={{ alignItems: "center" }}>
              <Link to={`/myMealPlans/${template.id}`}>
                <h2 style={{ margin: 0 }}>{template.name}</h2>
              </Link>
              <button style={{ marginLeft: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", padding: "8px 12px" }} onClick={() => handleClick(template.id)}>
                Delete
              </button>
            </FlexBetween>
          </div>
        ))}
    </>
  )}
</div>

  );
};

export default MyMealPlans;
