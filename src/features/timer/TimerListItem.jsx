import React from "react";
import { useHistory } from "react-router-dom";
import { secondsToTimeString } from "../../global/timeFunctions";
import { useDispatch } from "react-redux";
import { removeTimer } from "./timerSlice";
import FontIcon from "../../common/FontIcon";

import "./TimerListItem.scss";

export default function TimerListItem({ timer }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const goToTimerPage = () => {
    history.push(`/timers/${timer.id}`);
  };
  const deleteTimer = (e) => {
    e.stopPropagation();
    const id = timer.id;
    dispatch(removeTimer({ id }));
  };
  const hmsString = secondsToTimeString(timer.seconds);
  return (
    <div className="timer-list-item" onClick={goToTimerPage}>
      <div className="columns" style={{ alignItems: "center" }}>
        <div className="column is-narrow">
          <FontIcon icon="hourglass-half" className="fa-2x" />
        </div>
        <div className="column">
          <h3 className="timer-title">{timer.title}</h3>
          <p>
            Total runtime: <strong>{hmsString}</strong>
          </p>
        </div>
        <div className="column is-narrow">
          <button
            type="button"
            className="button is-outlined is-danger"
            onClick={deleteTimer}
          >
            <FontIcon icon="trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
