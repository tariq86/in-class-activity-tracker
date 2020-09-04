import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from './app/store';

/**
 * Render the given React content wrapped with a react-router instance
 * @param {React} content The React content to render
 * @param {{}} param1 router info
 */
export function renderWithRouter(
    content,
    {
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) {
    const Wrapper = ({ children }) => (
        <Router history={history}>{children}</Router>
    );
    return {
        ...render(content, { wrapper: Wrapper }),
        history,
    }
}

/**
 * Render the given React content wrapped with a redux instance
 * @param {React} content The React content to render
 */
export function renderWithStore(content, options) {
    return render((
        <Provider store={store}>{content}</Provider>
    ), options);
}

/**
 * Initialize Font Awesome Library
 */
export function faInit() {
    library.add(fas);
}