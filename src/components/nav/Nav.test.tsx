import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from "../../App";
import {RouterPaths} from "../../pages/Main";

describe('Nav component', () => {
    it('should navigate properly', () => {
        render(<App/>);

        const planetsLink = screen.getByRole('link', {name: new RegExp(RouterPaths.Planets.replace("/", ""), 'i')}),
            favoritesLink = screen.getByRole('link', {name: new RegExp(RouterPaths.Favorites.replace("/", ""), 'i')});

        fireEvent.click(planetsLink);
        expect(window.location.pathname).toBe(RouterPaths.Planets);

        fireEvent.click(favoritesLink);
        expect(window.location.pathname).toBe(RouterPaths.Favorites);
    });
});
