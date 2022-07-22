import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  PRIMARY_COLOR,
  SIDEBAR_SECONDARY_COLOR,
} from "../../../constants/colors";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",

    "& .sub-links": {
      display: "none",
    },

    // Normal Link Selected
    "& .selected": {
      "& .headlink-title": {
        color: PRIMARY_COLOR,
      },
      "& .parent-link": {
        background: "white",
        padding: "0.6em 1em",
        borderRadius: "10px",

        "& .icon": {
          marginRight: "0.8em",

          "& svg": {
            color: PRIMARY_COLOR,
          },
        },
      },
      // Sub-Link Selected

      "& .sublink-selected *": {
        color: PRIMARY_COLOR,
      },
    },

    // Multiple: Link Selected
    "& .expand-icon": {
      transition: "all 0.5s ease",
      color: PRIMARY_COLOR,
    },

    "& .expanded": {
      "& .sub-links": {
        display: "block",
      },
      "& .expand-icon": {
        transform: "rotate(90deg)",
      },
    },
  },

  sidebarLink: {
    transition: "all 5s ease",

    // Normal Link
    "& .parent-link": {
      padding: "0.6em 1em",
      borderRadius: "10px",
      marginBottom: "10px",
      backgroud: SIDEBAR_SECONDARY_COLOR,

      "& .icon": {
        marginRight: "0.8em",
        "& svg": {
          color: SIDEBAR_SECONDARY_COLOR,
        },
      },
    },

    // Normal Link:hover

    "&:hover": {
      "& .parent-link": {
        background: "white",
        padding: "0.6em 1em",
        borderRadius: "10px",

        "& .icon": {
          marginRight: "0.8em",

          "& svg": {
            color: PRIMARY_COLOR,
          },
        },
      },
    },
  },

  subLink: {
    padding: "0.2em 0em 0em 3em",
  },
}));

const Sidebar = ({ links }) => {
  const classes = useStyles();

  const [selectedLink, setSelectedLink] = useState("");
  const [subLinkSelected, setSubLinkSelected] = useState("");
  const [expandedLink, setExpandedLink] = useState("");

  const linkClickHandler = (linkName) => {
    return () => {
      setSubLinkSelected("");
      if (expandedLink == linkName) {
        setExpandedLink("");
      } else {
        setExpandedLink(linkName);
      }
      setSelectedLink(linkName);
    };
  };

  const getLinkStyleCls = (linkName) => {
    // if (linkName == selectedLink) {
    //   let style="s";
    //   if (linkName == expandedLink) {
    //     style_cls += " expanded";
    //   }
    //   return style_cls;
    // }
    // return "";
    if (linkName == selectedLink) {
      let style_cls = " selected";
      if (linkName == expandedLink) {
        style_cls += " expanded";
      }
      return style_cls;
    }

    return "";
  };

  const dispatch = useDispatch();

  const getSubLinks = (link, setSelectedLink) => {
    const handleClick = (subLinkTitle) => {
      return () => {
        setSelectedLink(link.name);
        setSubLinkSelected(subLinkTitle);
      };
    };

    const isSubLinkSelected = (subLinkTitle) => {
      if (subLinkTitle == subLinkSelected) {
        return " sublink-selected";
      }
      return "";
    };

    return (
      <div className={classes.subLinksContainer + " sub-links"}>
        {link.sub_links.map((link) => {
          return (
            <div
              className={
                classes.subLink + " flex" + isSubLinkSelected(link.title)
              }
              onClick={handleClick(link.title)}
            >
              <i class="icon-Commit">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>

              <Link to={{ pathname: link.url }}>
                <Typography
                  variant="subtitle2"
                  color={SIDEBAR_SECONDARY_COLOR}
                  style={{ marginLeft: "1em" }}
                >
                  {link.title}
                </Typography>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {links.map((link) => {
        return (
          <div>
            <div className={classes.sidebarLink + getLinkStyleCls(link.name)}>
              <div
                className="parent-link flex-space-between"
                onClick={linkClickHandler(link.name)}
              >
                <div className="left flex all-center ">
                  <div className="icon">{link.svg}</div>
                  <Link to={{ pathname: link.url }}>
                    <Typography
                      variant="subtitle2"
                      color={SIDEBAR_SECONDARY_COLOR}
                      className="vertical-center headlink-title"
                    >
                      {link.name}
                    </Typography>
                  </Link>
                </div>

                {link.type == "multiple" && (
                  <div className="right vertical-center ">
                    <i class="fa-solid fa-angle-right expand-icon"></i>
                  </div>
                )}
              </div>

              {link.type == "multiple" && getSubLinks(link, setSelectedLink)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
