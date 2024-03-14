import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    beforeEach(() => {
        render(<App/>);
    });

    test('renders without crashing', () => {
        // This test just checks that the component renders without crashing
    });
});
