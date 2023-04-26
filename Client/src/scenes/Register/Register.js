import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import FlexCenter from "../../components/FlexCenter";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const fName = data.get("firstName");
    const lName = data.get("lastName");
    const eml = data.get("email");
    const pass = data.get("password");

    if (fName === "" || lName === "" || eml === "" || pass === "") {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    const newdata = {
      firstName: fName,
      lastName: lName,
      email: eml,
      password: pass,
    };

    const savedUserResponse = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(newdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (savedUserResponse.ok) {
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <Box component={Paper} elevation={6} square style={{ margin: "0% 20%" }}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          padding: "60px 100px",
        }}
      >
        <FlexCenter flexDirection="column">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        </FlexCenter>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "450px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Enter First Name"
            name="firstName"
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Enter Last Name"
            name="lastName"
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />

          {loading ? (
            <FlexCenter margin="50px">
              <CircularProgress />
            </FlexCenter>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          )}
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
