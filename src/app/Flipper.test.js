import React from 'react';
import { render } from '@testing-library/react';
import Flipper from './Flipper.jsx';

test('renders the flipper', () => {
    const { getByRole } = render(
        <Flipper />
    );
    expect(getByRole('group', 'flipper')).toBeInTheDocument();
    expect(getByRole('region', { name: 'flipper-front' })).toBeInTheDocument();
    expect(getByRole('region', { name: 'flipper-back' })).toBeInTheDocument();
});
// TODO: add more tests!