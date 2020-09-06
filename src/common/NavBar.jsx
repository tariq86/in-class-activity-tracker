import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FontIcon from "./FontIcon";
import { toggleTheme } from "../app/appSlice";
import AppLogo from "./AppLogo";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const activeTheme = useSelector((state) => state.app.theme);
  const toggleNavbar = () => setIsActive(!isActive);
  const dispatch = useDispatch();
  return (
    <nav
      className={`navbar is-fixed-bottom ${
        activeTheme === "dark" ? "is-dark" : "is-light"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <AppLogo />
          {/* <img src={logo} className="navbar-logo" alt="logo" width="100" height="100" /> */}
        </a>
        <span
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="Menu Toggle"
          aria-expanded="false"
          data-target="main-navbar"
          onClick={toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      <div
        id="main-navbar"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <NavLink
            to="/"
            className="navbar-item"
            activeClassName="active"
            role="link"
            exact
          >
            Home
          </NavLink>
          <NavLink
            to="/timers"
            className="navbar-item"
            activeClassName="active"
            role="link"
            exact={true}
          >
            Timers
          </NavLink>
          <NavLink
            to="/hue-bridge"
            className="navbar-item"
            activeClassName="active"
            role="link"
            exact={true}
          >
            Hue Bridge Info
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                type="button"
                id="toggle-theme-button"
                className={`button ${
                  activeTheme === "light" ? "is-dark" : "is-light"
                }`}
                onClick={() => dispatch(toggleTheme())}
              >
                <FontIcon icon={activeTheme === "light" ? "moon" : "sun"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
