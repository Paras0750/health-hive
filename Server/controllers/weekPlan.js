import fetch from "node-fetch";
import dotenv from "dotenv";
import { getUserByEmail } from "../services/userService.js";

dotenv.config();

/* DELETE MEAL PLAN  */

export const deleteMealPlan = async (req, res) => {
  console.log("delete Meal Plan");
  try {
    const { user, id } = req.body;
    
    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates/${id}?hash=${user.spoonacularHash}&apiKey=${process.env.SPOONACULAR_API_KEY}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log({ data });
    return res.status(200).redirect("/myMealPlans");
  } catch (error) {
    console.error("Error deleting meal plan:", error);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
};



/* SAVE PERSONAL WEEK PLAN  */

export const saveWeekPlan = async (req, res) => {
  try {
    const { PushData, email } = req.body;

    const user = await getUserByEmail(email);

    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates?hash=${user.spoonacularHash}&apiKey=${process.env.SPOONACULAR_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(PushData),
      }
    );
    const data = await response.json();
    console.log({ data });
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error saving week plan:", error);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
};

/* CREATE PERSONAL WEEK PLAN  */

export const createWeekPlan = async (req, res) => {
  console.log("Started creating week plan");
  try {
    const { calories, diet, exclude } = req.body;

    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${calories}&diet=${diet}&exclude=${exclude}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();
    console.log({ data });
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error creating week plan:", error);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
};

/* PERSONAL WEEK PLAN FETCH */

export const weekPlan = async (req, res) => {
  console.log("Started fetching week plan");
  try {
    const { id, email } = req.body;

    const user = await getUserByEmail(email);

    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates/${id}?apiKey=${process.env.SPOONACULAR_API_KEY}&hash=${user.spoonacularHash}`
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
      `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates?apiKey=${process.env.SPOONACULAR_API_KEY}&hash=${user.spoonacularHash}`
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
