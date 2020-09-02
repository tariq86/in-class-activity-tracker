import React from 'react';
import { render } from '@testing-library/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import FontIcon from './FontIcon.jsx';

test('renders the font icon', () => {
    const { getByRole } = render(
        <FontIcon icon={faCheck} />
    );
    expect(getByRole('image', 'font-icon')).toBeInTheDocument();
});
// TODO: add more tests! Check if .fa-check exists?