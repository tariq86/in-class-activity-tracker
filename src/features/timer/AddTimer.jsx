import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { addTimer } from './timerSlice';
import { setHueGroups } from '../hue/hueSlice';
import { showModal, showToast } from '../../global/alertFunctions';
import HueHub from '../hue/hue-hub';
import SlackClient from '../slack/slack-api';
import FontIcon from '../../common/FontIcon.jsx';

import './AddTimer.scss';

export default function AddTimerPage() {
    const [formData, setFormData] = useState({
        hours: '',
        minutes: '',
        seconds: '',
        title: '',
        message: '',
        hueAlertGroup: '',
        sendSlackMessage: false,
    });
    const [hueAlertGroup, setHueAlertGroup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const onInputChanged = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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
        if (totalSeconds <= 0) {
            showToast('error', 'Activity timer must be > 0');
            return;
        }
        const payload = {
            id,
            active: false,
            seconds: totalSeconds,
            title: formData.title,
            message: formData.message,
            sendSlackMessage: formData.sendSlackMessage,
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
        total += (formData.hours * 3600);
        total += (formData.minutes * 60);
        total += parseInt(formData.seconds.length === 0 ? 0 : formData.seconds);
        console.debug("Total Seconds: ", total);
        return total;
    };
    const builGroupSelectOptions = (allGroups) => {
        const options = {};
        for (const prop in allGroups) {
            if (allGroups.hasOwnProperty(prop)) {
                options[prop] = allGroups[prop].name;
            }
        }
        return options;
    }
    /**
     * Prompt the user to select a Hue group
     */
    const promptForHueGroup = async () => {
        const allHueGroups = await new HueHub().getLightGroups();
        if (Object.keys(allHueGroups).length === 0) {
            return;
        }
        dispatch(setHueGroups(allHueGroups));
        const inputOptions = builGroupSelectOptions(allHueGroups);
        console.log("inputOptions: ", inputOptions);
        const { value: group } = await showModal('question', 'Select Light Group', {
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
    /**
     * Go to the "All Timers" route
     * @returns {null}
     */
    const goToAllTimersRoute = () => {
        history.push('/timers');
        return null;
    };
    return (
        <div className="page has-text-centered">
            <div className="panel is-success">
                <div className="panel-heading">
                    <div className="columns" style={{ alignItems: "center" }}>
                        <div className="panel-heading-button column is-narrow">
                            <button type="button"
                                onClick={goToAllTimersRoute}
                                className="button is-link is-inverted is-outlined">
                                <FontIcon icon="arrow-left" />
                            </button>
                        </div>
                        <div className="panel-heading-title column">
                            Create New Activity
                        </div>
                    </div>
                </div>
                <form id="timer-form" onSubmit={createTimer}>
                    <label htmlFor="hours" className="label">Enter Time</label>
                    <div id="hms-fields" className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <input type="number"
                                className="input"
                                name="hours"
                                id="hours"
                                placeholder="HH"
                                value={formData.hours}
                                onChange={onInputChanged} />
                        </div>
                        <div className="control">
                            <input type="number"
                                className="input"
                                name="minutes"
                                id="minutes"
                                placeholder="MM"
                                value={formData.minutes}
                                onChange={onInputChanged} />
                        </div>
                        <div className="control">
                            <input type="number"
                                className="input"
                                name="seconds"
                                id="seconds"
                                placeholder="SS"
                                value={formData.seconds}
                                onChange={onInputChanged} />
                        </div>
                    </div>
                    <small className="is-size-7">
                        Total Second(s): {calculateTotalSeconds()}
                    </small>
                    <div className="columns my-2">
                        {
                            hueAlertGroup === false ? (
                                <div className="column">
                                    <button
                                        type="button"
                                        onClick={promptForHueGroup}
                                        className="button is-info is-outlined">
                                        Add Hue Light Group
                                    </button>
                                </div>
                            ) : (
                                    <div className="column">
                                        <h3>Selected Group: {hueAlertGroup}</h3>
                                    </div>
                                )
                        }
                    </div>
                    <div className="field">
                        <label htmlFor="title" className="label">Title</label>
                        <div className="control">
                            <input type="text"
                                id="title"
                                name="title"
                                placeholder="Activity title"
                                className="input"
                                required="required"
                                value={formData.title}
                                onChange={onInputChanged} />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="message" className="label">Message</label>
                        <div className="control">
                            <textarea type="text"
                                id="message"
                                name="message"
                                className="textarea"
                                placeholder="Enter the activity instructions here!"
                                autoComplete="off"
                                aria-labelledby="message-help"
                                value={formData.message}
                                onChange={onInputChanged} />
                        </div>
                        <small id="message-help"
                            className="is-size-7">Try entering some Markdown!</small>
                    </div>
                    <div className="field">
                        <label className="checkbox">
                            <input type="checkbox"
                                disabled={new SlackClient().isEnabled() === false}
                                value={formData.sendSlackMessage}
                                onChange={onInputChanged} />
                                Send Slack Message?
                        </label>
                    </div>
                    <button className="button is-large is-success is-fullwidth"
                        type="submit">
                        Create Activity
                    </button>
                </form>
            </div>
        </div>
    );
}