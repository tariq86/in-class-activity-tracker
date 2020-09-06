import React from "react";
import { Link } from "react-router-dom";
import AppLogo from "../common/AppLogo";

/**
 *
 */
export default function HomePage() {
  return (
    <div id="home-page" className="page container">
      <div className="box has-text-centered">
        <h1>In-Class Activity Tracker</h1>
        <div id="home-icon">
          <AppLogo size="10x" fixedWidth={true} />
        </div>
        <p>
          Welcome! Check out the <Link to="/timers">Timers</Link> page to get
          started.
        </p>
      </div>
    </div>
  );
}
