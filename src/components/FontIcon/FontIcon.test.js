import React from 'react';
import { render } from '@testing-library/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import FontIcon from './FontIcon.jsx';

test('renders the font icon', () => {
    const { baseElement, getByRole } = render(
        <FontIcon icon={faCheck} />
    );
    expect(getByRole('img', 'Font Icon')).toBeInTheDocument();
    const svgEl = baseElement.querySelector('svg');
    expect(svgEl).toHaveAttribute('data-prefix', 'fas');
    expect(svgEl).toHaveAttribute('data-icon', 'check');
});