import React from 'react';
import { render } from '@testing-library/react';
import FavoriteIcon from './FavoriteIcon';

describe('FavoriteIcon Component', () => {
    const testCases = [
        { filled: false, expectedFill: 'none' },
        { filled: true, expectedFill: expect.not.stringContaining('none') }
    ];

    testCases.forEach(({ filled, expectedFill }) => {
        it(`renders icon with filled=${filled}`, () => {
            const { container } = render(<FavoriteIcon filled={filled} />);
            const svg = container.querySelector('svg');
            expect(svg).toBeInTheDocument();
            expect(svg).toHaveAttribute('fill', expectedFill);
        });
    });
});
