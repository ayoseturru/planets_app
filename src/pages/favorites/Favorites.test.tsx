import {fireEvent, render, screen} from "@testing-library/react";
import {RouterPaths} from "../Main";
import React from "react";
import ReferenceLanguageFile from "../../_locales/en.json";
import App from "../../App";

const expectedDocumentTitle: string = ReferenceLanguageFile.favorites;

describe('Favorites Page', () => {
    it('should render without crashing', () => {
        render(<App/>);

        const favoritesLink = screen.getByRole('link', {name: new RegExp(RouterPaths.Favorites.replace("/", ""), 'i')});

        fireEvent.click(favoritesLink);
        expect(window.location.pathname).toEqual(RouterPaths.Favorites);
        expect(document.title).toBe(expectedDocumentTitle);
    });
});
