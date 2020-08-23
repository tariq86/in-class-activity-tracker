import React from 'react';
import logo from '../../logo.svg';
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
        <div className="page container">
            <div className="d-flex align-items-center p-3 my-3 bg-secondary rounded shadow-sm">
                {/* TODO: switch with FontAwesome icon that's closer to a timer */}
                <img className="mr-3" src={logo} alt="" width="48" height="48" />
                <div className="lh-100">
                    <h3 className="mb-0 text-white lh-100">All Timers</h3>
                </div>
            </div>

            <div className="my-3 p-3 bg-white rounded shadow-sm">
                {allTimers.length > 0
                    ? renderTimers()
                    : <h6 className="text-center">No timers found; please add one!</h6>
                }
                {allTimers.length > 0 &&
                    <small className="d-block text-right mt-3">
                        <a href="#" className="text-red" onClick={clearTimers}>Clear all</a>
                    </small>
                }
            </div>
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <button type="button" onClick={goToAddTimerRoute} className="btn btn-lg btn-primary btn-block">Add New</button>
            </div>
        </div>
    );
}