import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

/**
 * Render the given element wrapped with a react-router instance
 * @param {React} ui The React/UI element to render
 * @param {{}} param1 router info
 */
export function renderWithRouter(
    ui,
    {
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) {
    const Wrapper = ({ children }) => (
        <Router history={history}>{children}</Router>
    );
    return {
        ...render(ui, { wrapper: Wrapper }),
        history,
    }
}

/**
 * Initialize Font Awesome Library
 */
export function faInit() {
    library.add(fas);
}