import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Button } from "@material-ui/core";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import OtpInput from "react-otp-input";
import { PRIMARY_COLOR } from "../../constants/colors";

import { useLocation, useNavigate } from "react-router-dom";
import {
  useSendMailMutation,
  useVerifyMailMutation,
} from "../../redux/features/auth/authApiSlice";

const useStyles = makeStyles((theme) => ({
  root: {},
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

const VerifyEmail = () => {
  const classes = useStyles();

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let signupValues = undefined;

  if (location.state?.formValues) {
    signupValues = location.state.formValues;
  } else {
  }
  const [sendMail, { sending_mail }] = useSendMailMutation();
  const [verifyMail, { verifying_mail }] = useVerifyMailMutation();

  const resendHandler = async () => {
    const resp = await sendMail(signupValues.email);
    if (resp.data.success) {
      console.log(resp);
      //Do something to show resend done
    }
  };

  const submitHandler = async () => {
    try {
      const resp = await verifyMail({
        email: signupValues.email,
        motp: otp,
      });
      console.log(resp);

      if (resp.data.success) {
        return navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (signupValues == undefined) {
      return navigate("/signup");
    }
  }, []);

  return (
    <div>
      <div className={classes.background}>
        <div className={classes.formContainer}>
          <Paper elevation={2}>
            <div className="flex-center">
              <MailOutlineIcon
                sx={{ fontSize: 100, color: "rgb(112 110 110)" }}
              />
            </div>
            <h2 className="text-center text-color-primary text-500">
              Please Verify Your Account.
            </h2>
            <p
              className="text-center text-500"
              style={{ color: "#9f9797", fontSize: "0.8em" }}
            >
              We have sent you an otp code on your email ...
              <br />
              Please check in spam if you didn't get it Wrong Email ?{" "}
              <a href="#" onClick={() => navigate(-1)}>
                Change
              </a>
            </p>

            <div className="otp-form">
              <div className="flex-center mt-2">
                <OtpInput
                  value={otp}
                  onChange={(otp) => setOtp(otp)}
                  numInputs={4}
                  separator={<span>-</span>}
                  inputStyle={{ padding: "0.4em" }}
                  focusStyle={{
                    outline: "none",
                    border: `2px solid ${PRIMARY_COLOR}`,
                    borderRadius: "3px",
                  }}
                />
              </div>
              <div className="action-btn flex-center mt-2">
                <div className="btn-container ">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: "1em" }}
                    onClick={submitHandler}
                  >
                    Verify
                  </Button>

                  <Button
                    variant="contained"
                    color="secodary"
                    size="small"
                    onClick={resendHandler}
                  >
                    Resend
                  </Button>
                </div>
                n
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
