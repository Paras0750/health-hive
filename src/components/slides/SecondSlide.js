import React from "react";
import {
  Container,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import useStyles from "../style";

const intensity = [
  "1-2 days a week",
  "6-7 days a week",
  "3-5 days a week",
  "X2 per day",
];

const SecondSlide = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography>Body Info</Typography>
      <FormControl variant="standard">
        <TextField
          label="Height"
          style={{ display: "block", margin: "12px" }}
        />
        <TextField
          label="Weight"
          style={{ display: "block", margin: "12px" }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={intensity}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Activity Level" />
          )}
          style={{ display: "block", margin: "12px" }}
        />
        <TextField
          label="Body Fat"
          type="number"
          style={{ display: "block", margin: "12px" }}
        />
      </FormControl>
    </Container>
  );
};

export default SecondSlide;
