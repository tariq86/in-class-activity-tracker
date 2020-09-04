import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimerListItem from './TimerListItem';
import { clearAllTimers } from './timerSlice';

export default function TimerList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const allTimers = useSelector(state => state.timers.all);

    const renderTimers = () => {
        return allTimers.map(timer => <TimerListItem timer={timer} key={timer.id} />)
    };

    return (
        <div id="timer-list-page" className="page container">
            <div className="panel is-info">
                <div className="panel-heading has-text-centered">
                    <h3>All Timers</h3>
                </div>
                <div className="my-3">
                    {allTimers.length > 0
                        ? renderTimers()
                        : <div className="my-6 has-text-centered">
                            <h3>No timers found; please add one!</h3>
                        </div>
                    }
                </div>
                <div className="panel-block">
                    <div className="column is-10">
                        <button onClick={() => history.push("/timers/new")}
                            className="button is-primary is-large is-fullwidth">
                            Add New Timer
                        </button>
                    </div>
                    <div className="column">
                        <button className="button is-outlined is-large is-fullwidth is-danger"
                            onClick={() => dispatch(clearAllTimers())}
                            disabled={allTimers.length <= 0}>
                            Clear all
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}