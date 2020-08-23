import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import TimerList from '../features/timers/TimerList.jsx';
import SelectBridgePage from '../pages/bridges/SelectBridge.jsx';
import HomePage from '../pages/HomePage.jsx';
import AddTimerPage from '../features/timers/AddTimer.jsx';
import TimerPage from '../features/timers/TimerPage.jsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const routes = [
    // { path: '/about', name: 'About', Component: About },
    { path: '/timers/new', name: 'Add New Timer', Component: AddTimerPage },
    { path: '/timers/:id', name: 'Timer Page', Component: TimerPage },
    { path: '/timers', name: 'All Timers', Component: TimerList },
    { path: '/hue-bridges', name: 'Select Hue Bridge', Component: SelectBridgePage },
    { path: '/', name: 'Home', Component: HomePage },
];

export default function RouteSwitcher() {
    let location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={250} unmountOnExit>
                <Switch location={location}>
                    <Route exact path="/timers/new" children={<AddTimerPage />} />
                    <Route exact path="/timers/:id" children={<TimerPage />} />
                    <Route exact path="/timers" children={<TimerList />} />
                    <Route exact path="/hue-bridges" children={<SelectBridgePage />} />
                    <Route exact path="/" children={<HomePage />} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}