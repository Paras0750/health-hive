import React from "react";
import { Container, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import useStyles from "../style";

const gender = ["Male","Female"];

const FirstSlide = () => {
    const classes = useStyles();

  return (
    <Container className={classes.container}>
      
      <Typography variant="overline" >
        Gender
      </Typography>
      <Autocomplete
        disablePortal
        fullWidth
        id="combo-box-demo"
        options={gender}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField  {...params} label="Select Gender" />}
        style={{ display: "block", margin: "12px" }}
      />
      <Typography variant="overline" >
        Age
      </Typography>
      <TextField 
      label="Enter Age"
      type="number"
      fullWidth
      />
      </Container>
  );
};

export default FirstSlide;
