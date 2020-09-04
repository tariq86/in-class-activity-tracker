import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '../../src/components/NavBar/NavBar.jsx';
import { BrowserRouter } from 'react-router-dom';

test('renders the HTML content', () => {
    const { getByRole } = render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    );
    expect(getByRole('navigation', { name: 'Main Navigation' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Menu Toggle' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Timers' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Hue Bridge Info' })).toBeInTheDocument();
});
// TODO: add test for menu visibility + toggle