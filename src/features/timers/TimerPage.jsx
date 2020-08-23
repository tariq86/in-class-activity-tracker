import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FontIcon from '../../app/FontIcon';
import { removeTimer } from './timersSlice';
import { parseHmsFromSecs } from '../../global/timeParser';

/**
 * Render the Timer page
 * Route: /timers/{id}
 */
export default function TimerPage() {
    // Initial setup
    const [intervalId, setIntervalId] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    let totalSeconds = 0;
    // Get the current timer from the store
    let timer = useSelector(state => {
        return state.timers.all.find(timer => {
            return timer.id === id;
        });
    });
    /**
     * Go to the "All Timers" route
     * @returns {null}
     */
    const goToAllTimersRoute = () => {
        history.push('/timers');
        return null;
    };
    // Set the initial seconds once on load, and also
    // clear out the intervalId during teardown
    useEffect(() => {
        setSecondsLeft(totalSeconds);
        return () => {
            if (intervalId === null) {
                return;
            }
            console.log("cleanup function; clearing interval: ", intervalId);
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [totalSeconds, intervalId]);
    // Send the user to the "All Timers" route if a timer wasn't found using the ID route parameter
    if (!timer) {
        return goToAllTimersRoute();
    }
    // Set the totalSeconds variable to the timer's total seconds
    totalSeconds = timer.seconds;
    /**
     * Handle timer/countdown completion here!
     * TODO: run any configured alerters here (i.e. "flash Hue lights")
     */
    const handleTimerComplete = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        isTimerActive = false;
        isTimerStarted = false;
        alert("We made it!");
    };
    /**
     * Start the countdown timer!
     */
    const startCountdownTimer = () => {
        let seconds = secondsLeft;
        let id = setInterval(() => {
            seconds = seconds - 1;
            setSecondsLeft(seconds);
            if (seconds <= 0) {
                handleTimerComplete();
                return;
            }
        }, 1000);
        setIntervalId(id);
    };
    /**
     * Stop the current countdown timer
     */
    const stopCountdownTimer = () => {
        clearInterval(intervalId);
        setSecondsLeft(totalSeconds);
        setIntervalId(null);
    };
    /**
     * Pause the current countdown timer
     */
    const pauseCountdownTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };
    /**
     * Build the display string for the countdown timer
     * @returns {String}
     */
    const getCountdownDisplay = () => {
        const { hours, minutes, seconds } = parseHmsFromSecs(secondsLeft);
        let displayHours = String(hours).padStart(2, '0');
        let displayMinutes = String(minutes).padStart(2, '0');
        let displaySeconds = String(seconds).padStart(2, '0');
        return `${displayHours}:${displayMinutes}:${displaySeconds}`;
    };
    /**
     * Delete the timer from the global store
     */
    const deleteTimer = () => {
        const id = timer.id;
        console.log(`Deleting timer ${id}...`);
        dispatch(removeTimer({ id }));
        goToAllTimersRoute();
    };
    // Boolean flag to indicate if the timer is active
    let isTimerActive = intervalId !== null;
    // Boolean flag to indicate whether the timer has started
    let isTimerStarted = secondsLeft !== totalSeconds;
    return (
        <div className="page container">
            <header className="clearfix">
            </header>
            <div className="jumbotron text-center">
                <div className="jumbotron-header-btns">
                    <button type="button"
                        onClick={goToAllTimersRoute}
                        className="btn btn-info jumbotron-header-btn float-left">
                        <FontIcon icon="arrow-left" />
                    </button>
                    <button type="button"
                        onClick={deleteTimer}
                        className="btn btn-danger jumbotron-header-btn float-right">
                        <FontIcon icon="trash" />
                    </button>
                </div>
                <h3 id="countdown-timer-display" className="display-3">{getCountdownDisplay()}</h3>
                <hr className="my-4" />
                <h4 className="display-4">{timer.message}</h4>
                <div className="my-4 row">
                    <div className="col-sm-4 text-center">
                        <button className="btn btn-success btn-lg"
                            type="button"
                            onClick={startCountdownTimer}
                            disabled={isTimerActive}>
                            <FontIcon icon="play" />
                        </button>
                    </div>
                    <div className="col-sm-4 text-center">
                        <button className="btn btn-info btn-lg"
                            type="button"
                            onClick={pauseCountdownTimer}
                            disabled={!isTimerActive}>
                            <FontIcon icon="pause" />
                        </button>
                    </div>
                    <div className="col-sm-4 text-center">
                        <button className="btn btn-danger btn-lg"
                            type="button"
                            onClick={stopCountdownTimer}
                            disabled={!isTimerStarted}>
                            <FontIcon icon="stop" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 text-center">
                    <small>Timer ID: <strong>{timer.id}</strong></small>
                </div>
            </div>
        </div>
    );
}