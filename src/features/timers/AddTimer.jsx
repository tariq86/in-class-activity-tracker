import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

import logo from '../../logo.svg';
import './Timer.css';
import { addTimer } from './timersSlice';

export default function AddTimerPage() {
    // Local state setup -- QDO: is this approach better, or should I use one state object?
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    // Form events
    const onHoursInputChanged = e => setHours(e.target.value);
    const onMinutesInputChanged = e => setMinutes(e.target.value);
    const onSecondsInputChanged = e => setSeconds(e.target.value);
    const onMessageInputChanged = e => setMessage(e.target.value);

    /**
     * Create a new timer object using the entered form data,
     * and then dispatch an event to save the new timer to
     * the centralized redux data store
     * @param {FormEvent} evt the form submit event that triggered the function call
     */
    const createTimer = (evt) => {
        evt.preventDefault();
        const id = nanoid();
        const totalSeconds = calculateTotalSeconds();
        dispatch(
            addTimer({
                id,
                active: false,
                seconds: totalSeconds,
                message,
            })
        );
        history.push(`/timers/${id}`);
    };
    /**
     * Calculate the total # of seconds for the timer,
     * using the current `hours`, `minutes`, and
     * `seconds` input field values
     */
    const calculateTotalSeconds = () => {
        let total = 0;
        total += (hours * 3600);
        total += (minutes * 60);
        total += parseInt(seconds.length === 0 ? 0 : seconds);
        console.debug("Total Seconds: ", total);
        return total;
    };

    return (
        <div className="container text-center">
            <form className="timer-form" onSubmit={createTimer}>
                <img className="mb-4" src={logo} alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Create a New Timer</h1>
                <label htmlFor="hours">Enter Time:</label>
                <div className="form-row">
                    <div className="col">
                        <input type="number"
                            className="form-control"
                            name="hours"
                            id="hours"
                            placeholder="HH"
                            value={hours}
                            onChange={onHoursInputChanged} />
                    </div>
                    <div className="col">
                        <input type="number"
                            className="form-control"
                            name="minutes"
                            id="minutes"
                            placeholder="MM"
                            value={minutes}
                            onChange={onMinutesInputChanged} />
                    </div>
                    <div className="col">
                        <input type="number"
                            className="form-control"
                            name="seconds"
                            id="seconds"
                            placeholder="SS"
                            value={seconds}
                            onChange={onSecondsInputChanged} />
                    </div>
                </div>
                <small className="form-text text-muted">
                    Total Second(s): {calculateTotalSeconds()}
                </small>
                <label htmlFor="message">Message:</label>
                <textarea type="text"
                    id="message"
                    className="form-control form-control-lg"
                    placeholder="Message"
                    required="required"
                    autoComplete="off"
                    value={message}
                    onChange={onMessageInputChanged} />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Create Timer</button>
            </form>
        </div>
    );
}