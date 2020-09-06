import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { setIconLoaded, setIconLoading } from "./fontIconSlice";
import { camelCase } from "lodash";
import { useDispatch, useSelector } from "react-redux";

export default function FontIcon(props) {
  const dispatch = useDispatch();
  // Load the icon, if it is given as a string or array
  const iconTypes = {
    fab: "brands",
    fal: "light",
    far: "regular",
    fas: "solid",
  };
  // Parse the icon name and library from the props
  let iconName = null;
  let iconLibrary = iconTypes["fas"];
  if (typeof props.icon === "string") {
    iconName = camelCase(`fa-${props.icon}`);
  } else if (typeof props.icon === "object") {
    if (typeof props.icon[0] === "string") {
      iconLibrary = iconTypes[props.icon[0]];
    }
    if (typeof props.icon[1] === "string") {
      iconName = camelCase(`fa-${props.icon[1]}`);
    }
  }
  const isIconLoaded = useSelector(
    (state) => state.fontIcon.loadedList[iconName] === true
  );
  const isIconLoading = useSelector(
    (state) => state.fontIcon.loadingList[iconName] === true
  );

  useEffect(() => {
    if (isIconLoaded === true) {
      console.debug(`Icon ${iconName} already loaded`);
      return;
    }
    if (isIconLoading === true) {
      console.debug(`Icon ${iconName} already loading`);
      return;
    }
    dispatch(setIconLoading(iconName));
    console.debug(`Loading ${iconName} icon from ${iconLibrary} set`);
    import(`@fortawesome/free-${iconLibrary}-svg-icons/${iconName}.js`)
      .then(({ definition }) => {
        if (definition) {
          library.add(definition);
          dispatch(setIconLoaded(iconName));
        }
      })
      .catch((err) => {
        console.warn(`Failed to load ${iconName} icon:`, err);
      });
  });
  // Don't render anything until we've loaded the icon
  if (isIconLoading === true || isIconLoaded === false) {
    return null;
  }
  return (
    <span className="icon" role="img" aria-label="Font Icon">
      <FontAwesomeIcon {...props} />
    </span>
  );
}
