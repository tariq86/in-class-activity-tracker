import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimerListItem from './TimerListItem';
import { clearAllTimers } from './timersSlice';

export default function TimerList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const allTimers = useSelector(state => state.timers.all);

    const renderTimers = () => {
        return allTimers.map(timer => <TimerListItem timer={timer} key={timer.id} />)
    };

    const goToAddTimerRoute = (evt) => {
        evt.preventDefault();
        history.push("/timers/new");
    }

    const clearTimers = (evt) => {
        evt.preventDefault();
        dispatch(clearAllTimers());
    }

    return (
        <div id="timer-list-page">
            <div className="panel is-primary">
                <div className="panel-heading has-text-centered">All Timers</div>
                <div className="my-3">
                    {allTimers.length > 0
                        ? renderTimers()
                        : <div className="panel-block has-text-centered">
                            <h6>No timers found; please add one!</h6>
                        </div>
                    }
                    {allTimers.length > 0 &&
                        <div className="panel-block">
                            <button className="button is-small is-outlined is-pulled-right is-danger"
                                onClick={clearTimers}>
                                Clear all
                            </button>
                        </div>
                    }
                </div>
                <div className="panel-block">
                    <button onClick={goToAddTimerRoute}
                        className="button is-primary is-outlined is-fullwidth">
                        Add New Timer
                    </button>
                </div>
            </div>
        </div>
    );
}