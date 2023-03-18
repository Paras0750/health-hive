import React from "react";
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

const pages = [
  {
    name: "Personalized Meal",
    herf: "/meal",
  },
  {
    name: "BMI ",
    herf: "/bmi",
  },
  {
    name: "Nutritional Analysis",
    herf: "/analysis",
  },
  {
    name: "Recipe Managment",
    herf: "/recipe",
  },
  {
    name: "Support",
    herf: "/support",
  },
];

const Navbar = () => {
  const classes = useStyles();

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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
