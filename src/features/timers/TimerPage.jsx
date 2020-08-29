import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import FontIcon from '../../app/FontIcon';
import TimerDisplay from './TimerDisplay';
import { removeTimer } from './timersSlice';
import { flashHueLightGroup } from '../hue/hue-api';
import Flipper from '../../app/Flipper';
import Markdowner from '../../app/Markdowner';

import './Timer.scss';
import { sendSlackAlert } from '../slack/slack-api';

/**
 * Render the Timer page
 * Route: /timers/{id}
 */
export default function TimerPage() {
    // Initial setup
    const [timerKeyIndex, setTimerKeyIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [timerStartedAt, setTimerStartedAt] = useState(null);
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
        setTimerStartedAt(moment());
        setIsActive(true);
    };
    /**
     * Reset the current countdown timer
     * In order to stop the component,
     * we need to regenerate the `key` props
     * on each of the timer objects.
     */
    const resetCountdownTimer = () => {
        setRemainingTime(totalSeconds);
        setTimerStartedAt(null);
        setIsActive(false);
        updateTimerKeys();
        setCountdownCompleted(false);
    };
    /**
     * Get the time that the timer will complete at,
     * if the timer is currently active.
     * @returns {String}
     */
    const getCompletionTime = () => {
        if (!isActive) {
            return "¯\\_(ツ)_/¯";
        }
        let startedAt = timerStartedAt;
        if (startedAt === null) {
            startedAt = moment();
        }
        return startedAt.add(remainingTime, 'seconds').format("YYYY-MM-DD hh:mm:ss")
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
        if (timer.sendSlackMessage) {
            sendSlackAlert(`Timer \`${timer.title}\` complete!`);
        }
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
            <div className="buttons is-centered my-4">
                <button className="button is-success is-large"
                    type="button"
                    onClick={startCountdownTimer}
                    disabled={isActive}>
                    <FontIcon icon="play" />
                    &nbsp;&nbsp;&nbsp;Start
                </button>
                <button className="button is-info is-large"
                    type="button"
                    onClick={pauseCountdownTimer}
                    disabled={!isActive}>
                    <FontIcon icon="pause" />
                    &nbsp;&nbsp;&nbsp;Pause
                </button>
                <button className="button is-danger is-large"
                    type="button"
                    onClick={resetCountdownTimer}
                    disabled={!isActive}>
                    <FontIcon icon="redo" />
                    &nbsp;&nbsp;&nbsp;Reset
                </button>
            </div>
            <div className="columns">
                <div className="column has-text-centered">
                    Timer will complete at:<br /><strong>{getCompletionTime()}</strong>
                </div>
            </div>
        </div>
    );
    const timerCompleteDisplay = (
        <div id="timer-complete-display">
            <h2 className="title my-4">Time's up!</h2>
            <div className="columns">
                <div className="column has-text-centered">
                    <strong>Make sure you're recording!</strong>
                </div>
            </div>
            <div className="columns mt-4">
                <div className="column has-text-centered">
                    <button className="button is-success is-large"
                        type="button"
                        onClick={resetCountdownTimer}>
                        <FontIcon icon="redo" />
                        <span>Let's do that again!</span>
                    </button>
                </div>
            </div>
        </div>
    );
    const slackEnabledHtml = (
        <div id="slack-enabled-message" className="has-text-success">
            <FontIcon icon={["fab", "slack"]} />
            Slack alert enabled!
        </div>
    );
    return (
        <div id="timer-page" className="page container">
            <div className="card has-text-centered">
                <div className="card-header" style={{ alignItems: 'center' }}>
                    <button type="button"
                        onClick={goToAllTimersRoute}
                        className="button is-info">
                        <FontIcon icon="arrow-left" />
                    </button>
                    <p className="card-header-title" style={{ justifyContent: 'center' }}>
                        {timer.title}
                    </p>
                    <button type="button"
                        onClick={deleteTimer}
                        className="button is-danger is-right">
                        <FontIcon icon="trash" />
                    </button>
                </div>
                <div className="card-content">
                    <Flipper flipped={countdownCompleted} front={timerWithControls} back={timerCompleteDisplay} />
                    {timer.sendSlackMessage && slackEnabledHtml}
                    {timer.message && <Markdowner source={timer.message} />}
                </div>
            </div>
            <div className="columns">
                <div className="column has-text-centered">
                    <small>Timer ID: <em>{timer.id}</em></small>
                </div>
            </div>
        </div>
    );
}