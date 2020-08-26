import React from 'react';
import { useHistory } from 'react-router-dom';
import { secondsToHmsString } from '../../global/timeParser';
import FontIcon from '../../app/FontIcon';

export default function TimerListItem(props) {
    const timer = props.timer;
    const history = useHistory();

    const goToTimerPage = () => {
        history.push(`/timers/${timer.id}`);
    }
    const hmsString = secondsToHmsString(timer.seconds);
    return (
        <div className="media timer-list-item my-2" onClick={goToTimerPage}>
            <div className="mx-3 align-self-center">
                <FontIcon icon="hourglass-half" className="fa-3x" />
            </div>
            <div className="media-body align-self-center">
                <h3 className="timer-title">{timer.title}</h3>
                <h5 className="timer-total-time">Total runtime: {hmsString}</h5>
            </div>
        </div>
    );
}