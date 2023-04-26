import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Dish = (props) => {
  return (
    <>
      <Paper display="flex" flexDirection="column" sx={{margin: "5px",padding: "20px", minWidth:"80px"}}>
        <Grid container>
          <Grid item md={4} display="flex" justifyContent="center" alignItems="center">
            <Avatar src={props.image} alt="" style={{width:"60px",height:"60px"}}/>
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
