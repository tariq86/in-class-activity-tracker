import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

import logo from '../../logo.svg';
import './Timer.scss';
import { addTimer } from './timersSlice';
import { showModal } from '../../global/modals';
import { getHueLightGroups } from '../hue/hue-api';

export default function AddTimerPage() {
    // Local state setup -- QDO: is this approach better, or should I use one state object?
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [hueAlertGroup, setHueAlertGroup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    // Form events
    const onHoursInputChanged = e => setHours(e.target.value);
    const onMinutesInputChanged = e => setMinutes(e.target.value);
    const onSecondsInputChanged = e => setSeconds(e.target.value);
    const onTitleInputChanged = e => setTitle(e.target.value);
    const onMessageInputChanged = e => setMessage(e.target.value);
    // const onHueAlertGroupChanged = e => setHueAlertGroup(e.target.value);

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
        const payload = {
            id,
            active: false,
            seconds: totalSeconds,
            title,
            message,
        }
        if (parseInt(hueAlertGroup) > 0) {
            payload.hueAlertGroup = parseInt(hueAlertGroup);
        }
        dispatch(addTimer(payload));
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

    const builGroupdSelectOptions = (allGroups) => {
        const options = {};
        for (const prop in allGroups) {
            if (allGroups.hasOwnProperty(prop)) {
                options[prop] = allGroups[prop].name;
            }
        }
        return options;
    }

    const promptForHueGroup = async () => {
        const allHueGroups = await getHueLightGroups();
        if (Object.keys(allHueGroups).length === 0) {
            return;
        }
        const inputOptions = builGroupdSelectOptions(allHueGroups);
        console.log("inputOptions: ", inputOptions);
        const { value: group } = await showModal({
            title: 'Select Light Group',
            input: 'select',
            inputValue: hueAlertGroup,
            inputOptions: inputOptions,
            inputPlaceholder: 'Select a light group',
            showCancelButton: true,
        });

        if (group) {
            setHueAlertGroup(group);
        }
    };

    return (
        <div className="page container text-center">
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
                <div className="row my-2">
                    <div className="col-sm-12">
                        <button type="button" onClick={promptForHueGroup} className="btn btn-lg btn-info">
                            Add Hue Light Group
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={onTitleInputChanged} />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea type="text"
                        id="message"
                        className="form-control form-control-lg"
                        placeholder="Message"
                        required="required"
                        autoComplete="off"
                        aria-labelledby="message-help"
                        value={message}
                        onChange={onMessageInputChanged} />
                    <small id="message-help" className="form-text text-muted">Try entering some Markdown!</small>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Create Timer</button>
            </form>
        </div>
    );
}