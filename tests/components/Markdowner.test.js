import React from 'react';
import { render } from '@testing-library/react';
import Markdowner from '../../src/components/Markdowner/Markdowner.jsx';


const testMdSource = `
# Hello World!

* Test 1
* Test 2
`;

test('renders the markdown source', () => {
    const { getAllByRole, getByRole } = render(
        <Markdowner source={testMdSource} />
    );
    expect(getAllByRole('listitem')).toHaveLength(2);
    expect(getByRole('article', { name: 'markdown-content' })).toBeInTheDocument();
    expect(getByRole('heading', 'Hello World!')).toBeInTheDocument();
});