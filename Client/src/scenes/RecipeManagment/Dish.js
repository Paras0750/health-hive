import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Dish = (props) => {
  return (
    <>
      <Paper display="flex" flexDirection="column" sx={{margin: "20px"}}>
        <Grid container>
          <Grid item md={2} display="flex" justifyContent="center" alignItems="center">
            <Avatar src={props.image} alt="" />
          </Grid>
          <Grid item md> 
            <Typography fontSize="15px" gutterBottom display="flex" alignItems="center">
              {props.title}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Dish;
