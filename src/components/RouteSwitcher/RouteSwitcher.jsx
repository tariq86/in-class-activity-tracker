import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import TimerList from '../../features/timers/TimerList.jsx';
import BridgeInfoPage from '../../features/hue/BridgeInfo.jsx';
import HomePage from '../../pages/home';
import AddTimerPage from '../../features/timers/AddTimer.jsx';
import TimerPage from '../../features/timers/TimerPage.jsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function RouteSwitcher() {
    let location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={250} unmountOnExit>
                <Switch location={location}>
                    <Route exact path="/timers/new" children={<AddTimerPage />} />
                    <Route exact path="/timers/:id" children={<TimerPage />} />
                    <Route exact path="/timers" children={<TimerList />} />
                    <Route exact path="/hue-bridge" children={<BridgeInfoPage />} />
                    <Route exact path="/" children={<HomePage />} />
                    <Route path="*">File Not Found</Route>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}