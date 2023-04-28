import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setLogin } from "../../state/state";
import { BASE_URL } from "../../services/helper";
import FlexCenter from "../../components/FlexCenter";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const data = new FormData(event.currentTarget);

    const newdata = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(newdata);

    const loggedInResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(newdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
    }
    setLoading(false);
    if (loggedInResponse.ok) {
      navigate("/");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={6}
      square
      style={{
        margin: "0% 10%",
        padding: "20px",
      }}
    >
      <Box>
        <Box
          sx={{
            my: 2,
            mx: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <FlexCenter flexDirection="column">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </FlexCenter>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            {loading ? (
              <FlexCenter margin="20px">
                <CircularProgress />
              </FlexCenter>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <Grid container spacing={2}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
