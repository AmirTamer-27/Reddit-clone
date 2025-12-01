import React from "react";

import Whatshot from "@mui/icons-material/Whatshot";
import NewReleases from "@mui/icons-material/NewReleases";
import TrendingUp from "@mui/icons-material/TrendingUp";
import Menu from "@mui/icons-material/Menu";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";


import "./MainBar.css";
import Posts from "../posts/Posts";

export default function MainBar() {
  return (
    <div className="main-bar">
      <div className="update-card">
        <div className="top-section">
          <span>UPDATES FROM REDDIT</span>

        </div>
        <div className="body hoverable">
          <div className="context">
            <span className="title">Keep yourself safe and informed</span>
            <br />
            <span className="description">Visit r/Coronavirus to talk about COVID-19, and visit www.who.int for more information.</span>
          </div>
          <img src="./assets/images/pin.jpg" />
        </div>
      </div>

      <div className="filter-container">
        <div className="filter-element hoverable">
          <Whatshot />
          <span>Hot</span>
        </div>
        <div className="filter-element hoverable">
          <span>Everywhere</span>
          <ArrowDropDown />
        </div>
        <div className="filter-element-secondary hoverable">
          <NewReleases />
          <span>New</span>
        </div>
        <div className="filter-element-secondary hoverable">
          <TrendingUp />
          <span>Top</span>
        </div>
        <MoreHoriz className="filter-element-tertiary hoverable" />
        <div className="spacer"></div>
        <div className="filter-element-menu hoverable">
          <Menu />
          <ArrowDropDown />
        </div>
      </div>

      <Posts />
    </div>
  );
}