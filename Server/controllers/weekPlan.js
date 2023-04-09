import fetch from "node-fetch";
import dotenv from "dotenv";
import { getUserByEmail } from "../services/userService.js";

dotenv.config();

/* WEEK PLAN FETCH */

export const weekPlan = async (req, res) => {
  console.log("Started fetching week plan");
  try {
    const { id, email } = req.body;

    const user = await getUserByEmail(email);

    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates/${id}?apiKey=d530179012ee4e238dd9730c30f0783a&hash=${user.spoonacularHash}`
    );
    const data = await response.json();
    console.log({ data });
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching meal plan details:", error);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
};

/* ALL SAVED MEAL PLAN FETCH */

export const allMealPlans = async (req, res) => {
  console.log("Started fetching week plan");
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates?apiKey=d530179012ee4e238dd9730c30f0783a&hash=${user.spoonacularHash}`
      );
    const data = await response.json();
    console.log({ data });

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching meal plan details:", error);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
};
