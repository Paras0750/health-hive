import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../components/style";

const Bmi = () => {
  const classes = useStyles();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBmi] = useState();
  const [info, setInfo] = useState(false);

  const handleHeight = (e) => {
    setHeight(e.target.value);
  };
  const handleWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleBMI = () => {
    if (!weight || !height) {
      setBmi(0);
      setInfo("Enter Correct Values");
    }

    let val = (
      [Number(weight) / Number(height) / Number(height)] * 10000
    ).toFixed(1);

    setBmi(val);

    if (val < 18.5) {
      setInfo("You are Under Weight");
    } else if (val > 18.5 && val <= 24.9) {
      setInfo("You are Healthy");
    } else if (val > 24.9 && val < 30) {
      setInfo("You are Overweight");
    }
  };

  return (
    <>
      <Container
        className={classes.container}
        style={{ flexDirection: "column" }}
      >
        <Typography variant="h2">Bmi Calulator</Typography>
        <TextField
          id="height"
          name="height"
          label="Height"
          placeholder="Enter your height in cm"
          onChange={handleHeight}
          inputProps={{
            autoComplete: "off",
          }}
        />
        <TextField
          id="weight"
          name="weight"
          label="Weight"
          placeholder="Enter your weight in kg"
          onChange={handleWeight}
          inputProps={{
            autoComplete: "off",
          }}
        />
        <Button
          onClick={handleBMI}
          color="primary"
          variant="outlined"
          style={{ margin: "8px" }}
        >
          Caluclate BMI
        </Button>

        {info && (
          <>
            <Typography variant="h6">
              {" "}
              {bmi ? <Typography>BMI is {bmi}</Typography> : null}
            </Typography>
            <Typography variant="subtitle1"> {info}</Typography>
          </>
        )}
      </Container>
    </>
  );
};

export default Bmi;
