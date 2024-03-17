import React, {useCallback, useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import withDocumentTitle from './withDocumentTitle';
import Planets from "./planets/Planets";
import {css, StyleSheet} from "aphrodite";
import Favorites from "./favorites/Favorites";
import {useDispatch, useSelector} from "react-redux";
import {Simulate} from "react-dom/test-utils";
import {PlanetsService, PlanetsServiceResponse} from "../services/PlanetsService";
import {ThemeContext} from "../providers/ThemeProvider";
import Grid from "../utils/Grid";
import {PlanetsAppState} from "../state/reducers/initialState";
import Time from "../utils/Time";
import PlanetsCreator from "../state/creators/planets.creator";
import Nav from "../components/nav/Nav";
import {TranslationsContext} from "../providers/TranslationProvider";
import Logger from "../utils/Logger";
import error = Simulate.error;

type PageLinks = {
    Planets: string;
    Planet: string;
    Favorites: string;
};

export const RouterPaths: PageLinks = {
    Planets: "/planets",
    Planet: "/planets/:planetId",
    Favorites: "/favorites"
};

interface MainComponentProps {
    planetsService: PlanetsService
}

let timer: number | undefined = undefined;

const Main: React.FC<MainComponentProps> = ({planetsService}) => {
    const {theme} = useContext(ThemeContext),
        dispatch = useDispatch(),
        styles = StyleSheet.create({
            mainWrapper: Grid.define("auto", "auto"),
            main: {
                ...Grid.setRowCol(1, 1),
                ...Grid.define("auto", "minmax(auto, 226px) auto"),
                backgroundColor: theme.app.background,
                minHeight: "100vh",
                height: "100%"
            },
            nav: Grid.setRowCol(1, 1),
            pageContent: Grid.setRowCol(1, 2)
        }),
        currentTtl: number = useSelector((state: PlanetsAppState) => state.planetsData.ttl),
        [ttlInvalid, setTtlInvalid] = useState(Time.getTimeInMs() >= currentTtl);

    const setPlanets = (serverResponse: PlanetsServiceResponse): void => {
        dispatch(PlanetsCreator.setPlanets(serverResponse.planets, serverResponse.ttl + Time.getTimeInMs()));
    };

    const setPlanetsCallback = useCallback(setPlanets, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                for await (const response of planetsService.fetchPlanets()) {
                    if (response.error) Logger.logError(error);
                    setPlanetsCallback(response);
                }
            } catch (error) {
                Logger.logError(error);
            }
        };

        if (ttlInvalid) fetchData();
    }, [planetsService, setPlanetsCallback, ttlInvalid]);

    useEffect(() => {
        // If it was set to zero, it was hit on the above useEffect
        if (currentTtl > 0) {
            clearTimeout(timer);
            setTimeout(() => setTtlInvalid(true), Math.max(currentTtl - Time.getTimeInMs(), 0));
        }
    }, [ttlInvalid, currentTtl]);

    // Apparently, react-router-dom >= 6.0.0 does not allow HOC call inside the Route. It must be defined sadly outside.
    const PlanetsPage = withDocumentTitle(Planets, useContext(TranslationsContext).getMessage('planetsPage')),
        FavoritesPage = withDocumentTitle(Favorites, useContext(TranslationsContext).getMessage('favorites'));

    return (
        <div className={css(styles.mainWrapper)}>
            <div className={css(styles.main)}>
                <Router>
                    <Nav extraStyle={styles.nav}/>
                    <div className={css(styles.pageContent)}>
                        <Routes>
                            <Route path={RouterPaths.Planets} element={<PlanetsPage/>}/>
                            <Route path={RouterPaths.Planet} element={<PlanetsPage/>}/>
                            <Route path={RouterPaths.Favorites} element={<FavoritesPage/>}/>
                            <Route path="*" element={<Navigate to={RouterPaths.Planets}/>}/>
                        </Routes>
                    </div>
                </Router>
            </div>
        </div>
    );
};

export default Main;

