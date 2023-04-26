import React, { useState } from "react";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "../../components/style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import FlexCenter from "../../components/FlexCenter";

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
  const [loadingGenerateMeal, setLoadingGenerateMeal] = useState(false);
  const [isMealSaved, setIsMealSaved] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (event) => {
    window.scrollTo(0, document.body.scrollHeight);
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

  const [diet2, setDiet2] = useState({
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsMealSaved(false);
    
    if (user === null) {
      navigate("/login");
      return;
    }

    handleButtonClick();

    const data = new FormData(event.currentTarget);

    if (!data.get("calories") || !selectedDiet) {
      // If either field is empty, show an error message
      alert("Please select a diet and enter your calorie goal.");
      return;
    }

    const newdata = {
      diet: selectedDiet,
      calories: data.get("calories"),
      exclude: data.get("exclude"),
    };

    setLoadingGenerateMeal(true);
    const dietResponse = await fetch(`${BASE_URL}/meal/generateMeal`, {
      method: "POST",
      body: JSON.stringify(newdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const Diet = await dietResponse.json();
    console.log("API DATA: ", Diet);
    setDiet(Diet);
    setDiet2(Diet.data.week);
    console.log("SET DATA: ", Diet);
    setLoadingGenerateMeal(false);
  };

  const saveMeal = async () => {
    const PushData = {
      name: inputValue,
      items: [],
      publishAsPublic: false,
    };

    console.log("Diet before mods: ", diet);

    var numday = 0;
    for (const day in diet.data.week) {
      numday += 1;
      var slot = 0;
      for (const meal in diet.data.week[day].meals) {
        console.log(diet.data.week[day].meals[meal].id);
        slot += 1;
        PushData.items.push({
          day: numday,
          slot: slot,
          position: 0,
          type: "RECIPE",
          value: {
            id: diet.data.week[day].meals[meal].id,
            servings: diet.data.week[day].meals[meal].servings,
            title: diet.data.week[day].meals[meal].title,
            imageType: diet.data.week[day].meals[meal].imageType,
          },
        });
      }
    }

    await fetch(`${BASE_URL}/meal/saveMeal`, {
      method: "POST",
      body: JSON.stringify({ PushData, email: user.email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(setIsMealSaved(true))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Container
      className={classes.container}
      style={{ flexDirection: "column", background: "" }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          style={{
            backgroundImage: `url('https://aicontentfy.com/hubfs/Blog/a%20robot%20and%20stack%20of%20papers%20in%20flat%20illustration%20style%20with%20gradients%20and%20white%20background_compressed%20b14e7452-f586-4f03-a16a-1e0793837ffc.jpg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minWidth: "600px",
          }}
        />
        <Grid item xs={12} md={4} lg={6}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Typography variant="h3" style={{ margin: "20px 0px" }}>
              Upgrade your Diet
            </Typography>
            <Typography variant="h2" style={{ margin: "20px 0px" }}>
              Personalized Meal Plans
            </Typography>

            <FlexCenter flexDirection="column">
              <Typography variant="h5">Select a diet</Typography>
              <Autocomplete
                disablePortal
                name="diet"
                id="combo-box-demo"
                options={diets}
                sx={{ width: 300, margin: "20px 0px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Diet" />
                )}
                value={selectedDiet}
                onChange={(event, newValue) => {
                  setSelectedDiet(newValue);
                }}
              />
              <Typography variant="h5">Enter your calories</Typography>
              <TextField
                label="Calories"
                name="calories"
                sx={{ margin: "20px 0px", width: 300 }}
              />
              <TextField
                label="Intolerant food (optional)"
                name="exclude"
                sx={{ margin: "12px", width: 300 }}
              />

              {diet2.monday.meals.length !== 0 ? (
                <Button
                  variant="contained"
                  style={{ margin: "12px" }}
                  type="submit"
                >
                  Regenerate meal plan
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ margin: "12px" }}
                  type="submit"
                >
                  Generate my meal plan
                </Button>
              )}
            </FlexCenter>
          </Box>
        </Grid>
      </Grid>

      {/* GENEREATED MEAL SECTION */}

      <div
        style={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          padding: "20px",
          margin: "90px 0px",
        }}
      >
        <Box>
          {diet2.monday.meals.length !== 0 ? (
            <Box style={{ margin: "40px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "12px",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h2" sx={{ margin: "40px" }}>
                  Personalized Generated Meal Plan
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "12px",
                  }}
                >
                  <br />

                  {isMealSaved ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "12px",
                          flexDirection: "column",
                        }}
                      >
                        <h2>Meal Plan Saved.</h2>
                        <Button
                          href="/myMealPlans"
                          variant="contained"
                          sx={{
                            borderRadius: "8px",
                            marginLeft: "8px",
                            textTransform: "none",
                          }}
                        >
                          See All Meal Plans
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "12px",
                          flexDirection: "column",
                        }}
                      >
                        <TextField
                          size="small"
                          label="Give Meal Plan A Name"
                          name="Saved Name"
                          onChange={handleInputChange}
                          sx={{ margin: "20px 0px", width: 300 }}
                        />

                        <Button
                          size="small"
                          onClick={() => saveMeal()}
                          variant="contained"
                          sx={{
                            borderRadius: "8px",
                            marginLeft: "8px",
                            textTransform: "none",
                          }}
                        >
                          Save Meal Plan
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!loadingGenerateMeal ? (
                <Typography variant="h3" style={{ padding: "120px" }}>
                  Click On Generate Meal Plan
                </Typography>
              ) : (
                <Box style={{ margin: "60px 0px" }}>
                  <CircularProgress />
                </Box>
              )}
            </Box>
          )}
        </Box>
        {console.log("Before Sending", diet2)}

        {diet2.monday.meals.length !== 0 && (
          <Box>
            {Object.keys(diet2).map((day, index) => {
              const meals = diet2[day].meals;
              return (
                <div key={index} style={{ margin: "30px" }}>
                  <h2 style={{ textTransform: "capitalize" }}>
                    Day {index + 1}
                  </h2>
                  <div style={{ margin: "15px 5px 45px 45px" }}>
                    <ul>
                      {meals.map((meal) => (
                        <li key={meal.id}>
                          <h3>{meal.title}</h3>
                          <p>Servings: {meal.servings}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </Box>
        )}
      </div>
    </Container>
  );
};

export default PersonalMeal;
