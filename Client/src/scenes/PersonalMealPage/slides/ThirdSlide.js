import React from "react";
import { Container, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import useStyles from "../../../components/style.js";


const ThirdSlide = (props) => {
  const classes = useStyles();


  return (
    <Container className={classes.container}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.diets}
        renderInput={(params) => (
          <TextField {...params} label="Activity Level" />
        )}
        maxWidth
      />
      <TextField
        label="How Fast"
        style={{ display: "block", margin: "12px" }}
      />
      <TextField
        label="Goal Weight"
        placeholder="Optional"
        style={{ display: "block", margin: "12px" }}
      />
      <TextField
        label="Goal Body Fat"
        placeholder="Optional"
        style={{ display: "block", margin: "12px" }}
      />
      <TextField
        label="Diet Type"
        placeholder="Optional"
        style={{ display: "block", margin: "12px" }}
      />
    </Container>
  );
};

export default ThirdSlide;
