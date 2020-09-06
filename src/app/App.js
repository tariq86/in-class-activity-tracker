import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

import NavBar from "../common/NavBar";
import RouteSwitcher from "../common/RouteSwitcher";

import "./App.scss";

// library.add(faSlack);

export default function App() {
  const activeTheme = useSelector((state) => state.app.theme);
  useEffect(() => {
    if (activeTheme === "light") {
      document.body.classList.remove("theme-dark");
      document.body.classList.add("theme-light");
      return;
    }
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
  }, [activeTheme]);
  return (
    <Router>
      <main role="main" className="container">
        <RouteSwitcher />
      </main>
      <NavBar />
    </Router>
  );
}
