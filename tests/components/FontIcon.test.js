import React from 'react';
import { render } from '@testing-library/react';
import FontIcon from '../../src/components/FontIcon/FontIcon.jsx';

test('renders the font icon', () => {
    const { baseElement, getByRole } = render(
        <FontIcon icon="check" />
    );
    expect(getByRole('img', 'Font Icon')).toBeInTheDocument();
    const svgEl = baseElement.querySelector('svg');
    expect(svgEl).toHaveAttribute('data-prefix', 'fas');
    expect(svgEl).toHaveAttribute('data-icon', 'check');
});