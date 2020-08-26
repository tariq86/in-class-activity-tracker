import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import FontIcon from '../../app/FontIcon';
import TimerDisplay from './TimerDisplay';
import { removeTimer } from './timersSlice';
import { flashHueLightGroup } from '../hue/hue-api';
import Flipper from '../../app/Flipper';

/**
 * Render the Timer page
 * Route: /timers/{id}
 */
export default function TimerPage() {
    // Initial setup
    const [timerKeyIndex, setTimerKeyIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [countdownCompleted, setCountdownCompleted] = useState(false);
    let history = useHistory();
    const dispatch = useDispatch();
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
    // Set the initial seconds once on load
    useEffect(() => {
        setRemainingTime(totalSeconds);
    }, [totalSeconds]);
    // Send the user to the "All Timers" route if a timer wasn't found using the ID route parameter
    if (!timer) {
        return <Redirect to='/timers' />;
    }
    // Set the totalSeconds variable to the timer's total seconds
    totalSeconds = timer.seconds;
    /**
     * Start the countdown timer!
     */
    const startCountdownTimer = () => {
        setIsActive(true);
    };
    /**
     * Stop the current countdown timer
     * In order to stop the component,
     * we need to regenerate the `key` props
     * on each of the timer objects.
     */
    const stopCountdownTimer = () => {
        setIsActive(false);
        setRemainingTime(totalSeconds);
        updateTimerKeys();
    };

    const resetCountdownTimer = () => {
        setRemainingTime(totalSeconds);
        setIsActive(false);
        updateTimerKeys();
        setCountdownCompleted(false);
    };
    /**
     * Pause the current countdown timer
     */
    const pauseCountdownTimer = () => {
        setIsActive(false);
        setRemainingTime(totalSeconds);
    };
    /**
     * Update the index used to build the timer `key` properties
     * This is needed in order to fully stop an in-progress timer
     */
    const updateTimerKeys = () => {
        setIsActive(false);
        setTimerKeyIndex(prevKey => prevKey + 1);
    }
    /**
     * The onComplete function for the seconds clock
     * This is the timer that should trigger all "Timer Complete" actions
     * @param {Number} totalElapsedTime the total elapsed time of the countdown
     *
     */
    const handleSecondsComplete = (totalElapsedTime) => {
        if (remainingTime - totalElapsedTime > 0) {
            return [true, 0];
        }
        setIsActive(false);
        setCountdownCompleted(true);
        if (timer.hueAlertGroup) {
            flashHueLightGroup(timer.hueAlertGroup);
        }
    }
    /**
     * Delete the current timer from the store
     */
    const deleteTimer = () => {
        const id = timer.id;
        dispatch(removeTimer({ id }));
        goToAllTimersRoute();
    };
    // TODO: is this the best way to wait for the timer to load from the redux store?
    if (totalSeconds === 0) {
        return null;
    }
    const timerWithControls = (
        <div id="timer-with-controls">
            <TimerDisplay isActive={isActive}
                totalSeconds={totalSeconds}
                activeIndex={timerKeyIndex}
                onComplete={handleSecondsComplete} />
            <div className="my-4 row">
                <div className="col-sm-4 text-center">
                    <button className="btn btn-success btn-xl"
                        type="button"
                        onClick={startCountdownTimer}
                        disabled={isActive}>
                        <FontIcon icon="play" />&nbsp;&nbsp;Start
                    </button>
                </div>
                <div className="col-sm-4 text-center">
                    <button className="btn btn-info btn-xl"
                        type="button"
                        onClick={pauseCountdownTimer}
                        disabled={!isActive}>
                        <FontIcon icon="pause" />&nbsp;&nbsp;Pause
                    </button>
                </div>
                <div className="col-sm-4 text-center">
                    <button className="btn btn-danger btn-xl"
                        type="button"
                        onClick={resetCountdownTimer}
                        disabled={!isActive}>
                        <FontIcon icon="redo" />&nbsp;&nbsp;Reset
                    </button>
                </div>
            </div>
        </div>
    );
    const timerCompleteDisplay = (
        <div id="timer-complete-display">
            <h2 className="display-2 my-4">Time's up!</h2>
            <div className="row">
                <div className="col-sm-12 text-center">
                    <button className="btn btn-success"
                        type="button"
                        onClick={resetCountdownTimer}>
                        <FontIcon icon="redo" />&nbsp;&nbsp;Let's do that again!
            </button>
                </div>
            </div>
        </div>
    );
    return (
        <div id="timer-page" className="page container">
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
                <h4 className="display-4">{timer.message}</h4>
                <hr className="my-4" />
                <Flipper flipped={countdownCompleted} front={timerWithControls} back={timerCompleteDisplay} />
            </div>
            <div className="row">
                <div className="col-sm-12 text-center">
                    <small>Timer ID: <strong>{timer.id}</strong></small>
                </div>
            </div>
        </div>
    );
}