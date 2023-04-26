import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/state";
import { InputBase, Select, MenuItem, FormControl } from "@mui/material";
import {
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Button,
  Box,
  Grid,
  Link,
} from "@material-ui/core";
import useStyles from "../../components/style";
import FlexBetween from "../../components/FlexBetween";

const pages = [
  {
    name: "Personalized Meal",
    herf: "/meal",
  },

  {
    name: "Recipe Managment",
    herf: "/recipe",
  },
  {
    name: "AI Chat Bot",
    herf: "/chatBot",
  },
  {
    name: "Support",
    herf: "/support",
  },
];

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let fullName = "";

  if (user && user.firstName && user.lastName) {
    fullName = `${user.firstName} ${user.lastName}`;
  }

  return (
    <>
      <CssBaseline />

      <AppBar position="relative" className={classes.navbar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md>
              <Link href="/" style={{ color: "white", textDecoration: "none" }}>
                <Typography variant="h6">Health-Hive</Typography>
              </Link>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ mx: 5 }}>
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.herf}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button style={{ color: "white" }} className={classes.link}>
                      {page.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Grid>
            <Grid item md={2}>
              {user ? (
                <FlexBetween gap="2rem">
                  <FormControl
                    sx={{ color: "white" }}
                    variant="standard"
                    value={fullName}
                    color="white"
                  >
                    <Select
                      value={fullName}
                      sx={{
                        color: "white",
                        width: "180px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                          pr: "0.25rem",
                          width: "3rem",
                        },
                      }}
                      input={<InputBase />}
                    >
                      <MenuItem color="white" value={fullName}>
                        <Typography style={{color:"white"}}  margin="10px">
                          {fullName}
                        </Typography>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          href="/myMealPlans"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          My Meal Plans
                        </Link>
                      </MenuItem>
                      <MenuItem
                        style={{ fontWeight: "bold" }}
                        onClick={() => dispatch(setLogout())}
                      >
                        Log Out
                      </MenuItem>
                    </Select>
                  </FormControl>
                </FlexBetween>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link sx={{ textDecoration: "none" }} href="/login">
                    <Button>
                      <Typography className={classes.text}>Login</Typography>
                    </Button>
                  </Link>
                  <Link sx={{ textDecoration: "none" }} href="/register">
                    <Button>
                      <Typography className={classes.text}>Register</Typography>
                    </Button>
                  </Link>
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
