import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { PRIMARY_COLOR } from "../../../constants/colors";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  background: "white",

  marginLeft: 0,
  width: "15em",
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(1),
    width: "15em",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em 0em 0em 0em",
    // width: "100%",

    "& .icon-button": {
      background: "white",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginRight: "10px",
      borderRadius: "10px",
    },
  },
  leftNav: {
    display: "flex",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
  },

  toogleIcon: {
    background: "white",
    "&:hover": {
      background: PRIMARY_COLOR,
      "& svg": {
        color: "white",
      },
    },
  },
  screenToogle: {
    background: "white",
    color: "orange",
    "&:hover": {
      background: "orange",
      "& svg": {
        color: "white",
      },
    },
  },

  notificationIcon: {
    background: "white",
    color: "#00D0FF",
    "&:hover": {
      background: "#00D0FF",
      "& svg": {
        color: "white",
      },
    },
  },

  settingsIcon: {
    background: "white",
    color: "#00D0FF",
    "&:hover": {
      background: "#00D0FF",
      "& svg": {
        color: "white",
      },
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.user);

  return (
    <div className={classes.root}>
      <nav className={classes.nav}>
        <div className={classes.leftNav}>
          <div
            className={classes.toogleIcon + " all-center"}
            style={{
              marginRight: "1em",
              borderRadius: "10px",
              padding: "0em 0.5em",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-bell"
              color={PRIMARY_COLOR}
            >
              <line x1="17" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="17" y1="18" x2="3" y2="18"></line>
            </svg>
          </div>
          <div className="search-bar all-center">
            <Search>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <SearchIconWrapper>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                  color="lightgray"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </SearchIconWrapper>
            </Search>
          </div>
        </div>

        <div className="right-nav flex">
          <div className="icon-group flex">
            <div div className={classes.screenToogle + " icon-button"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </div>

            <div className={classes.notificationIcon + " icon-button"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>

            <div div className={classes.settingsIcon + " icon-button"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
          </div>
          <div className="user-details flex">
            <div className="user-name">
              <Typography variant="subtitle2"> {user.name}</Typography>
              <Typography variant="caption">Doctor</Typography>
            </div>
            <div
              className="profile-pic"
              style={{
                height: "40px",
                width: "40px",
                background: "red",
                borderRadius: "50%",
                marginLeft: "1em",
              }}
            ></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
