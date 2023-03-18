import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "../../components/style";
import MealPopup from "./MealPopup";

const diets = [
  "Anything",
  "Gluten Free",
  "Paleo",
  "Vegetarian",
  "Vegan",
  "Ketogenic",
  "Flexitarian",
  "Pescatarian",
  "Meditarian",
];

const PersonalMeal = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Container
      className={classes.container}
      style={{ flexDirection: "column" }}
    >
      <Grid container>
        <Grid item md={5}>
          <Box>
            <Typography variant="h2" style={{ margin: "20px 0px" }}>
              Upgrade your Diet
            </Typography>
            <Typography variant="h3" style={{ margin: "20px 0px" }}>
              With Personalized Meal Plans
            </Typography>
            <Typography variant="h5">Step 1.Select a diet</Typography>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={diets}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Choose Diet" />
              )}
              style={{ display: "block", margin: "12px" }}
            />

            <Typography variant="h5">Step 2.Enter your calories</Typography>
            <TextField
              label="Calories"
              style={{ display: "block", margin: "12px" }}
            />
            <TextField
              label="Meals"
              style={{ display: "block", margin: "12px" }}
            />
            <Typography>
              Don't know? Calculate your information -{" "}
              <Button variant="contained" onClick={()=> setOpenPopup(true)}>Calculate</Button>
            </Typography>
            <Button variant="contained" style={{ margin: "12px" }}>
              Generate my meal plan
            </Button>
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={7}>
          <Box>
            <img
              src="https://source.unsplash.com/random"
              style={{ height: "700px", width: "800px" }}
              alt="img"
            ></img>
          </Box>
        </Grid>
      </Grid>

      <MealPopup title="Calories calculator" openPopup={openPopup} setOpenPopup={setOpenPopup} diets={diets} ></MealPopup>

    </Container>
  );
};

export default PersonalMeal;
