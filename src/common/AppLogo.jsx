import React from "react";
import FontIcon from "./FontIcon";

export default function AppLogo(props) {
  return (
    <FontIcon className="app-logo has-text-primary" {...props} icon="clock" />
  );
}
