import fetch from "node-fetch";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

/* CHAT GPT INTEGRATION */

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define the set of keywords/phrases that the chatbot will respond to
const ALLOWED_PROMPTS = [
  "Hello",
  "hello",
  "Hi",
  "How are you",
  "What's up",
  "health",
  "nutrition",
  "diet",
  "meal",
  "recipe",
  "grocery",
  "navigation",
  "meal plan",
  "grocery list",
  "grocery list",
  "navigation",
  "Live Support",
  "Dietician",
];


export const askGPT = async (req, res) => {
  console.log("Started asking GPT");
  
  try {
    const { prompt } = req.body;

    // Check if the user's prompt contains any of the allowed keywords/phrases
    const isAllowedPrompt = ALLOWED_PROMPTS.some((keyword) =>
      prompt.toLowerCase().includes(keyword.toLowerCase())
    );
    if (prompt.toLowerCase().includes("live support"|| "dietician")) {
      return res.status(200).json({
        result: " Support page link:http://localhost:3000/support",
      });
    }
    
    
    

    // If the prompt is not related to the allowed topics, return an error message
    if (!isAllowedPrompt) {
      return res.status(200).json({
        result:
          "Sorry, I can only help you with health/recipe-related questions and navigating the app",
      });
    }

    // If the prompt is related to the allowed topics, send it to the GPT model for processing
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ` ${prompt} `,
      temperature: 0.6,
      max_tokens: 500,
    });

    // Extract any image URLs from the GPT response
    const urls = completion.data.choices[0].text.match(
      /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif))/
    );
    let result = completion.data.choices[0].text;

    // If image URLs were found, append them to the response
    if (urls) {
      const imgTags = urls
        .map((url) => `<img src="${url}" alt="related image" width="300">`)
        .join("");
      result += "\n" + imgTags;
    }

    console.log({ result });
    return res.status(200).json({ result });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
};


/* GENERATE MEAL FOR USER */

export const generateMeal = async (req, res) => {
  console.log("Started generating meal");

  const { email } = req.body;
  try {
    await User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log(err);
        throw new Error("User Not Found");
      } else {
        const body = {
          timeFrame: "day",
          targetCalories: 2000,
          diet: "vegetarian",
          exclude: "shellfish",
        };

        const genMealResponse = fetch(
          "https://api.spoonacular.com/mealplanner/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        if (!genMealResponse.ok) {
          throw new Error("Failed to connect to Spoonacular API");
        }
        console.log(genMealResponse);

        const generatedMeal = genMealResponse.json();
        res.status(200).json(generatedMeal);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
