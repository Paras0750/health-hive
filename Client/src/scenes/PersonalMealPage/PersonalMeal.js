import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "../../components/style";
import MealPopup from "./MealPopup";

const diets = [
  "Anything",
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

const PersonalMeal = () => {
  const classes = useStyles();
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [diet, setDiet] = useState({
    meals: [],
    nutrients: {},
  });
  // const [openPopup, setOpenPopup] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newdata = {
      diet: selectedDiet,
      calories: data.get("calories"),
      exclude: data.get("exclude"),
    };

    const { diet, calories, exclude } = newdata;

    const dietResponse = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${calories}&diet=${diet}&exclude=${exclude}&apiKey=9919efef79a9459d8545a1d37fb9ecc4`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const Diet = await dietResponse.json();

    setDiet(Diet);
  };

  return (
    <Container
      className={classes.container}
      style={{ flexDirection: "column" }}
    >
      <Grid container>
        <Grid item md={5}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Typography variant="h2" style={{ margin: "20px 0px" }}>
              Upgrade your Diet
            </Typography>
            <Typography variant="h3" style={{ margin: "20px 0px" }}>
              With Personalized Meal Plans
            </Typography>
            <Typography variant="h5">Step 1.Select a diet</Typography>

            <Autocomplete
              disablePortal
              name="diet"
              id="combo-box-demo"
              options={diets}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Choose Diet" />
              )}
              style={{ display: "block", margin: "12px" }}
              value={selectedDiet}
              onChange={(event, newValue) => {
                setSelectedDiet(newValue);
              }}
            />

            <Typography variant="h5">Step 2.Enter your calories</Typography>
            <TextField
              label="Calories"
              name="calories"
              style={{ display: "block", margin: "12px" }}
            />
            <TextField
              label="Intolerant food (optional)"
              name="exclude"
              style={{ display: "block", margin: "12px" }}
            />
            {/* <Typography>
              Don't know? Calculate your information -
              <Button variant="contained" onClick={() => setOpenPopup(true)}>
                Calculate
              </Button>
            </Typography> */}
            <Button
              variant="contained"
              style={{ margin: "12px" }}
              type="submit"
            >
              Generate my meal plan
            </Button>
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={7}>
          <Box>
            {diet.meals.length > 0 ? (
              <Box>
                <h3>Total Calories:</h3>
                {diet.nutrients.calories}

                <h5>Protine:</h5>
                {diet.nutrients.protein}

                <h5>Fat:</h5>
                {diet.nutrients.fat}

                <h5>Carbs:</h5>
                {diet.nutrients.carbohydrates}


                <h3>Breafast:</h3>
                {diet.meals[0].title}
                <h3>Lunch:</h3>
                {diet.meals[1].title}
                <h3>Dinner:</h3>
                {diet.meals[2].title}
              </Box>
            ) : (
              <Typography variant="h3" style={{ padding: "120px" }}>
                Click On Generate Meal Plan
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* <MealPopup
        title="Calories calculator"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        diets={diets}
      ></MealPopup> */}
    </Container>
  );
};

export default PersonalMeal;
