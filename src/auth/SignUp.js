import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { handleSuccess, handleFailure } from "./GoogleAuth";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Card } from "./Login";
import { LoginContainer } from "./Login";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstNameError, setfirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setfirstNameErrorMessage] = React.useState("");

  const [lastNameError, setlastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    console.log(firstName);
    if (!firstName || firstName.length < 6) {
      setfirstNameError(true);
      setfirstNameErrorMessage(
        "First Name must be at least 6 characters long."
      );
      isValid = false;
    } else {
      setfirstNameError(false);
      setfirstNameErrorMessage("");
    }

    if (!lastName || lastName.length < 6) {
      setlastNameError(true);
      setLastNameErrorMessage("Last Name must be at least 6 characters long.");
      isValid = false;
    } else {
      setlastNameError(false);
      setLastNameErrorMessage("");
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const response = await axios.post(`${API_URL}/api/users/SignIn`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("User saved to localstorage");
        window.location.href = "/dashboard";
      } else {
        console.log("Sign-in failed. Please check your credentials.");
      }

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <LoginContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="First Name" sx={{ paddingBottom: "10px" }}>
                First Name
              </FormLabel>
              <TextField
                error={firstNameError}
                helperText={firstNameErrorMessage}
                id="FirstName"
                type="text"
                name="FirstName"
                placeholder="FirstName"
                autoComplete="firstname"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={event => setFirstName(event.target.value)}
                color={firstNameError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor=" Last Name" sx={{ paddingBottom: "10px" }}>
                Last Name
              </FormLabel>
              <TextField
                error={lastNameError}
                helperText={lastNameErrorMessage}
                id="LastName"
                type="text"
                name="LastName"
                placeholder="LastName"
                autoComplete="lastname"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={event => setLastName(event.target.value)}
                color={lastNameError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" sx={{ paddingBottom: "10px" }}>
                Email
              </FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={e => setEmail(e.target.value)}
                color={emailError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password" sx={{ paddingBottom: "10px" }}>
                Password
              </FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign Up
            </Button>
          </Box>

          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <GoogleOAuthProvider clientId="456032094822-vc80oldjuq4gtjc0n6j3qsite839ivns.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                useOneTap
              />
            </GoogleOAuthProvider>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Have an account?{" "}
              <Link to="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </LoginContainer>
    </div>
  );
}

export default SignUp;
