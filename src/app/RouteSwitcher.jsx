import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TimerList from '../features/timers/TimerList.jsx';
import SelectBridgePage from '../pages/bridges/SelectBridge.jsx';
import HomePage from '../pages/HomePage.jsx';
import AddTimerPage from '../features/timers/AddTimer.jsx';
import TimerPage from '../features/timers/TimerPage.jsx';

export default function RouteSwitcher() {
    return (
        <Switch>
            <Route path="/timers/new">
                <AddTimerPage />
            </Route>
            <Route path="/timers/:id">
                <TimerPage />
            </Route>
            <Route path="/timers">
                <TimerList />
            </Route>
            <Route path="/hue-bridges">
                <SelectBridgePage />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
        </Switch>
    );
}