import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import { Paper } from "@mui/material";
import { useFormik } from "formik";
import {
  useSignupMutation,
  useSendMailMutation,
} from "../../redux/features/auth/authApiSlice";

import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
    background: "url(/assets/images/bg-2.jpg)",
  },
  formContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& .MuiPaper-root": {
      minWidth: "600px",
      minHeight: "400px",
      padding: "1em 2em",
    },
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.fname) {
    errors.fname = "Required";
  } else if (values.fname.length > 15) {
    errors.fname = "Must be 15 characters or less";
  }

  if (!values.lname) {
    errors.lname = "Required";
  } else if (values.lname.length > 20) {
    errors.lname = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (String(values.phone).length !== 10) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};

const SignUp = () => {
  const classes = useStyles();

  const [signUp, { creating }] = useSignupMutation();
  const [sendMail, { sending_mail }] = useSendMailMutation();

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      fname: "",
      lname: "",
      phone: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await signUp(values);
        console.log(response);
        if (response.data?.success) {
          const emailResp = await sendMail({
            email: values.email,
          });

          if (emailResp.data?.success) {
            return navigate("/verify-email", {
              state: {
                formValues: values,
              },
            });
          } else {
            console.log(emailResp);
          }
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      <div className={classes.background}>
        <div className={classes.formContainer}>
          <Paper elevation={2}>
            <h1 className="text-center text-400 text-color-primary">
              Get started with Us
            </h1>

            <p className="text-center" sx={{ margin: 2 }}>
              Register a new membership
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="input-row" style={{ marginTop: "4em" }}>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField
                      id="fname"
                      label="First Name"
                      variant="outlined"
                      name="fname"
                      onChange={formik.handleChange}
                      size={"small"}
                      fullWidth
                      error={formik.errors.fname ? true : false}
                      helperText={
                        formik.errors.fname ? formik.errors.fname : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      id="lname"
                      label="Last Name"
                      variant="outlined"
                      name="lname"
                      onChange={formik.handleChange}
                      size={"small"}
                      fullWidth
                      error={formik.errors.lname ? true : false}
                      helperText={
                        formik.errors.lname ? formik.errors.lname : ""
                      }
                    />
                  </Grid>
                </Grid>
              </div>
              <div className="input-row" style={{ marginTop: "1em" }}>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField
                      id="email"
                      label="Email "
                      variant="outlined"
                      name="email"
                      onChange={formik.handleChange}
                      size={"small"}
                      inputProps={{ type: "email" }}
                      fullWidth
                      error={formik.errors.email ? true : false}
                      helperText={
                        formik.errors.email ? formik.errors.email : ""
                      }
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      id="phone"
                      label="phone"
                      variant="outlined"
                      name="phone"
                      onChange={formik.handleChange}
                      size={"small"}
                      inputProps={{ type: "number" }}
                      fullWidth
                      error={formik.errors.phone ? true : false}
                      helperText={
                        formik.errors.phone ? formik.errors.phone : ""
                      }
                    />
                  </Grid>
                </Grid>
              </div>
              <div className="tc" style={{ marginTop: "1em" }}>
                <input type="checkbox" id="tc" />
                <label htmlFor="tc">
                  I accept the{" "}
                  <span className="text-color-primary">
                    terms and condtions
                  </span>
                </label>
              </div>
              <div
                className="button-container flex-center"
                style={{ marginTop: "1em" }}
              >
                <Button variant="contained" color="primary" type="submit">
                  SignUp
                </Button>
              </div>

              <div className="login-redirect">
                <p style={{ fontSize: "0.9em" }} className="text-center">
                  Already have an account?{" "}
                  <span className="text-color-secondary">Sign In</span>
                </p>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
