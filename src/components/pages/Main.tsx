import React, {useContext} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import withDocumentTitle from './withDocumentTitle';
import Planets from "./planets/Planets";
import {TranslationsContext} from "../../providers/TranslationProvider";
import {css, StyleSheet} from "aphrodite";
import Grid from "../../utils/Grid";
import Nav from "../nav/Nav";
import Favorites from "./favorites/Favorites";

type PageLinks = {
    Planets: string;
    Favorites: string;
};

export const RouterPaths: PageLinks = {
    Planets: "/planets",
    Favorites: "/favorites"
};

const Main = () => {
    const styles = StyleSheet.create({
        main: {
            ...Grid.define("auto", "max-content auto"),
            height: "100vh"
        },
        nav: Grid.setRowCol(1, 1),
        pageContent: Grid.setRowCol(1, 2)
    });

    // Apparently, react-router-dom >= 6.0.0 does not allow HOC call inside the Route. It must be defined sadly outside.
    const PlanetsPage = withDocumentTitle(Planets, useContext(TranslationsContext).getMessage('planetsPage')),
        FavoritesPage = withDocumentTitle(Favorites, useContext(TranslationsContext).getMessage('favorites'));

    return (
        <div className={css(styles.main)}>
            <Router>
                <Nav extraStyle={styles.nav}/>
                <div className={css(styles.pageContent)}>
                    <Routes>
                        <Route path={RouterPaths.Planets} element={<PlanetsPage/>}/>
                        <Route path={RouterPaths.Favorites} element={<FavoritesPage/>}/>
                        <Route path="*" element={<Navigate to={RouterPaths.Planets}/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default Main;

