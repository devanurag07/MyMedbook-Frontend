import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import Stack from "@mui/material/Stack";

// Dialog

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import { toast } from "react-toastify";

// RTK QUERY
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import { setUserDetails } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignInSide() {
  const [formError, setFormError] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});
  const [otp, setOtp] = useState({});
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // rtk query hook
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const phoneNumber = event.currentTarget.phoneNumber.value;
    // request
    if (phoneNumber == "" || phoneNumber.length !== 10) {
      setFormError({
        error: "Please Enter A Valid Phone Number...",
        color: "red",
      });

      return;
    }

    setFormError({});

    sendOtp(phoneNumber);

    // setOtpDialog(true);
  };

  const handleOtpChange = (e) => {
    const otp = e.currentTarget.value;
    setOtp(otp);
  };

  const sendOtp = (number) => {
    axios
      .post("http://127.0.0.1:8000/get-login-otp-mobile/", {
        phone: number,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.success) {
          setOtpDialog(true);
          setPhoneNumber(number);
        } else {
          console.log("Something Wrong");
          console.log(resp.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (String(otp).length == 4) {
      try {
        const userData = await login({
          phone: phoneNumber,
          otp: otp,
        });

        console.log(userData);
        if (userData.data.status) {
          const user = userData.data.response;
          const token = userData.data.token;
          dispatch(setUserDetails({ ...user, token }));
          localStorage.setItem("token", token);

          if (user.is_admin) {
            return navigate("/admin");
          }
          
        }
        console.log(userData);
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Invalid OTP");
    }
  };
  const [otpDialog, setOtpDialog] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "auto",
          paddingBottom: "30px",
          backgroundImage: `/assets/images/bg-2.jpg`,
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "300px 300px",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6}>
          <Box
            className="login-box-modal"
            component={Paper}
            sx={{
              backgroundColor: "white",
              mt: 6,
              mb: 3,
              mx: 4,
              py: 5,
              px: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "12px",
            }}
          >
            <Typography
              component="h4"
              variant="h4"
              style={{ color: "#3246D3" }}
            >
              Let's Get Started
            </Typography>
            <Typography
              component="p"
              variant="p"
              style={{ marginTop: "10px", fontSize: "15px" }}
            >
              Sign in to continue to Rhythm.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <div className="error-field">
                {formError.error ? (
                  <div style={{ color: formError.color }}>
                    {formError.error}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                // autoFocus
                size="small"
                type={"number"}
              />

              {/* <Grid container>
                <Grid item xs>
                  <FormControlLabel
                    className="remember_check"
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember Me"
                  />
                </Grid>
                <Grid item>
                  <a
                    sx={{ lineHeight: "3", color: "#2f579a" }}
                    className="forgot_pass"
                    underline="none"
                    href="/Forget"
                    variant="body2"
                  >
                    <LockSharpIcon
                      sx={{ marginBottom: "5px" }}
                      fontSize="small"
                    />
                    Forgot pwd?
                  </a>
                </Grid> */}
              {/* </Grid> */}

              <Stack
                direction="row"
                spacing={5}
                sx={{ justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    fontSize: "0.875rem",
                    color: "white",
                    backgroundColor: "#ee3158",
                  }}
                >
                  Sign In
                </Button>
              </Stack>

              <Typography style={{ textAlign: "center", fontSize: "0.875rem" }}>
                Don't have an account?
                <Link
                  href="/signup"
                  variant="body2"
                  underline="none"
                  style={{
                    fontSize: "0.875rem",
                    marginLeft: "5px",
                    color: "#ffa800",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>

          <Typography
            style={{
              marginBottom: "16px",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "white",
            }}
          >
            - Sign With -
          </Typography>

          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            <Fab
              color="primary"
              aria-label="facebook"
              style={{ backgroundColor: "#3b5998" }}
            >
              <FaFacebookF size={21} />
            </Fab>
            <Fab
              color="warning"
              aria-label="Google"
              style={{ backgroundColor: "#1da1f2" }}
            >
              <FaTwitter size={21} />
            </Fab>
            <Fab
              color="error"
              aria-label="YouTube"
              style={{ backgroundColor: "#e1306c" }}
            >
              <FaInstagram size={21} />
            </Fab>
          </Stack>
        </Grid>

        <Dialog open={otpDialog}>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter OTP "
              type="number"
              fullWidth
              variant="standard"
              name="otp"
              onChange={(e) => handleOtpChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOtpDialog(false)}>Cancel</Button>
            <Button onClick={(e) => verifyOtp(e)}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
}
