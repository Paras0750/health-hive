import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "../../components/style";
import { useSelector } from "react-redux";

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
  const [inputValue, setInputValue] = useState("Default");
  const user = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [diet, setDiet] = useState({
    monday: {
      meals: [],
      nutrients: {},
    },
    tuesday: {
      meals: [],
      nutrients: {},
    },
    wednesday: {
      meals: [],
      nutrients: {},
    },
    thursday: {
      meals: [],
      nutrients: {},
    },
    friday: {
      meals: [],
      nutrients: {},
    },
    saturday: {
      meals: [],
      nutrients: {},
    },
    sunday: {
      meals: [],
      nutrients: {},
    },
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
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${calories}&diet=${diet}&exclude=${exclude}&apiKey=9919efef79a9459d8545a1d37fb9ecc4`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const Diet = await dietResponse.json();
    console.log("API DATA: ", Diet);
    setDiet(Diet);
  };

  const saveMeal = async () => {
    const PushData = {
      name: inputValue,
      items: [],
      publishAsPublic: false,
    };

    var numday = 0;
    for (const day in diet.week) {
      numday += 1;
      var slot = 0;
      for (const meal in diet.week[day].meals) {
        console.log(diet.week[day].meals[meal].id);
        slot += 1;
        PushData.items.push({
          day: numday,
          slot: slot,
          position: 0,
          type: "RECIPE",
          value: {
            id: diet.week[day].meals[meal].id,
            servings: diet.week[day].meals[meal].servings,
            title: diet.week[day].meals[meal].title,
            imageType: diet.week[day].meals[meal].imageType,
          },
        });
      }
    }
    console.log("Before Sending", PushData);

    await fetch(
      `https://api.spoonacular.com/mealplanner/${user.spoonacularUsername}/templates?hash=${user.spoonacularHash}&apiKey=9919efef79a9459d8545a1d37fb9ecc4`,
      {
        method: "POST",
        body: JSON.stringify(PushData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log("SENT DATA:", data))
      .catch((error) => console.error("Error:", error));
  };

  // const mealsForWeek = diet.week;
  // const days = Object.keys(mealsForWeek);
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
            {diet ? (
              <Box>
                <input id="inputBox" type="text" onChange={handleInputChange} />
                <br />
                <button onClick={() => saveMeal()}>Save Meal Plan</button>
              </Box>
            ) : (
              <Typography variant="h3" style={{ padding: "120px" }}>
                Click On Generate Meal Plan
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonalMeal;
{
  /* <MealPopup
        title="Calories calculator"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        diets={diets}
      ></MealPopup> */
}
{
  /* <Typography>
              Don't know? Calculate your information -
              <Button variant="contained" onClick={() => setOpenPopup(true)}>
                Calculate
              </Button>
            </Typography> */
}
