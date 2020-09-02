import React from 'react';
import { faInit, renderWithRouter } from '../test-utils';
import RouteSwitcher from './RouteSwitcher.jsx';
import { Provider } from 'react-redux';
import store from './store';

const ReduxRouter = (
    <Provider store={store}>
        <RouteSwitcher />
    </Provider>
);

test('404 page', () => {
    const { container } = renderWithRouter(ReduxRouter, {
        route: '/blah-blah',
    })
    expect(container.innerHTML).toMatch('<div>File Not Found</div>')
});

test('timers page', () => {
    faInit();
    const { container } = renderWithRouter(ReduxRouter, {
        route: '/timers',
    });
    expect(container.innerHTML).toContain("All Timers");
});
// TODO: add more tests! Do we want/need to test every single route?