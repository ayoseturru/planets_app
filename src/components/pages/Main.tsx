import React, {useCallback, useContext, useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import withDocumentTitle from './withDocumentTitle';
import Planets from "./planets/Planets";
import {TranslationsContext} from "../../providers/TranslationProvider";
import {css, StyleSheet} from "aphrodite";
import Grid from "../../utils/Grid";
import Nav from "../nav/Nav";
import Favorites from "./favorites/Favorites";
import {ThemeContext} from "../../providers/ThemeProvider";
import {PlanetsService, PlanetsServiceResponse} from "../../services/PlanetsService";
import Logger from "../../utils/Logger";
import {useDispatch} from "react-redux";
import PlanetsCreator from "../../state/creators/planets.creator";

type PageLinks = {
    Planets: string;
    Favorites: string;
};

export const RouterPaths: PageLinks = {
    Planets: "/planets",
    Favorites: "/favorites"
};

interface MainComponentProps {
    planetsService: PlanetsService
}

const Main = ({planetsService}: MainComponentProps) => {
    const {theme} = useContext(ThemeContext),
        dispatch = useDispatch(),
        styles = StyleSheet.create({
            main: {
                ...Grid.define("auto", "minmax(auto, 226px) auto"),
                backgroundColor: theme.app.background,
                height: "100vh"
            },
            nav: Grid.setRowCol(1, 1),
            pageContent: Grid.setRowCol(1, 2)
        });

    const setPlanets = (serverResponse: PlanetsServiceResponse): void => {
        dispatch(PlanetsCreator.setPlanets(serverResponse.planets, serverResponse.ttl));
    };

    const setPlanetsCallback = useCallback(setPlanets, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPlanetsCallback((await planetsService.fetchPlanets()));
            } catch (error) {
                Logger.logError(error);
            }
        };

        fetchData();
    }, [planetsService, setPlanetsCallback]); // Include only the dependencies needed inside the useEffect callback


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

