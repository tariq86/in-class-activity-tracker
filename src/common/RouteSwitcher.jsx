import React, { Suspense, lazy } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loading from '../routes/Loading';

const TimerList = lazy(() => import('../features/timer/TimerList'));
const BridgeInfoPage = lazy(() => import('../features/hue/BridgeInfo.jsx'));
const HomePage = lazy(() => import('../routes/Home'));
const AddTimerPage = lazy(() => import('../features/timer/AddTimer.jsx'));
const TimerPage = lazy(() => import('../features/timer/Timer.jsx'));

export default function RouteSwitcher() {
    let location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={250} unmountOnExit>
                <Suspense fallback={Loading}>
                    <Switch location={location}>
                        <Route exact path="/timers/new" children={<AddTimerPage />} />
                        <Route exact path="/timers/:id" children={<TimerPage />} />
                        <Route exact path="/timers" children={<TimerList />} />
                        <Route exact path="/hue-bridge" children={<BridgeInfoPage />} />
                        <Route exact path="/" children={<HomePage />} />
                        <Route path="*">File Not Found</Route>
                    </Switch>
                </Suspense>
            </CSSTransition>
        </TransitionGroup>
    );
}