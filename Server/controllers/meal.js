import fetch from "node-fetch";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const askGPT = async (req, res) => {
  console.log("Started asking GPT");
  try {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ` ${prompt} `,
      temperature: 0.6,
      max_tokens: 500,
    });
    console.log({ result: completion.data.choices[0].text });
    return res.status(200).json({ result: completion.data.choices[0].text });
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

