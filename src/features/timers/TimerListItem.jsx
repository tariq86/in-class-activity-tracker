import React from 'react';
import { useHistory } from 'react-router-dom';
import { secondsToTimeString } from '../../global/timeFunctions';
import { useDispatch } from 'react-redux';
import { removeTimer } from './timersSlice';
import FontIcon from '../../app/FontIcon';

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
        <div className="media" onClick={goToTimerPage}>
            <div className="media-left my-3 mx-3">
                <FontIcon icon="hourglass-half" className="fa-3x" />
            </div>
            <div className="media-content">
                <div className="content">
                    <h3 className="timer-title">{timer.title}</h3>
                    <p>Total runtime: <strong>{hmsString}</strong></p>
                </div>
            </div>
            <div className="media-right">
                <button className="delete" onClick={deleteTimer}>
                    <span className="is-sr-only">Delete</span>
                </button>
            </div>
        </div>
    );
}