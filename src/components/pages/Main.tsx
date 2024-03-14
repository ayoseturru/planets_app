import React, {useContext} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import withDocumentTitle from './withDocumentTitle';
import Planets from "./main/Planets";
import {TranslationsContext} from "../../providers/TranslationProvider";
import {css, StyleSheet} from "aphrodite";
import Grid from "../../utils/Grid";
import {ThemeContext} from "../../providers/ThemeProvider";

export const RouterPaths: Record<string, string> = {
    Planets: "/planets"
};

const Main = () => {
    const {theme} = useContext(ThemeContext),
        styles = StyleSheet.create({
            main: {
                ...Grid.define("max-content auto", "auto"),
                backgroundColor: theme.app.background,
                color: theme.app.text,
                height: "100vh"
            },
            pageContent: Grid.setRowCol(2, 1),
        });

    // Apparently, react-router-dom >= 6.0.0 does not allow HOC call inside the Route. It must be defined sadly outside.
    const PlanetsPage = withDocumentTitle(Planets, useContext(TranslationsContext).getMessage('planetsPage'));

    return (
        <div className={css(styles.main)}>
            <div className={css(styles.pageContent)}>
                <Router>
                    <Routes>
                        <Route path={RouterPaths.Planets} element={<PlanetsPage/>}/>
                        <Route path="*" element={<Navigate to={RouterPaths.Planets}/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
};

export default Main;

