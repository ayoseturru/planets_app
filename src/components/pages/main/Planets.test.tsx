import React from 'react';
import {render} from '@testing-library/react';
import ReferenceLanguageFile from "../../../_locales/en.json";
import App from '../../../App';

const expectedDocumentTitle: string = ReferenceLanguageFile.planetsPage;

describe('Planets Page Component', () => {
    beforeEach(() => {
        render(<App/>);
    });

    it('renders without crashing', () => {
        // This test just checks that the component renders without crashing
    });

    it('the user lands on it on first load without any interaction', () => {
        expect(document.title).toBe(expectedDocumentTitle);
    });
});
