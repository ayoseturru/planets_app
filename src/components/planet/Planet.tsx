import React, {useContext} from 'react';
import {css, StyleSheet} from "aphrodite";
import Grid from "../../utils/Grid";
import {ThemeContext} from "../../providers/ThemeProvider";
import {useParams} from "react-router-dom";
import {PlanetsCollection} from "../../models/PlanetsCollection";
import PlanetModel from "../../models/Planet";
import {useSelector} from "react-redux";
import {PlanetsAppState} from "../../state/reducers/initialState";
import {TranslationsContext} from "../../providers/TranslationProvider";

const Planet = () => {
    const {planetId} = useParams(),
        planets: PlanetsCollection = useSelector((state: PlanetsAppState) => state.planetsData.planets),
        planet: PlanetModel | null = planetId ? planets[parseInt(planetId)] : null,
        {theme} = useContext(ThemeContext),
        translations = useContext(TranslationsContext),
        styles = StyleSheet.create({
            container: {
                ...Grid.setRowCol(1, 2),
                ...Grid.define("max-content max-content", "auto"),
                gridRowGap: 41,
                backgroundColor: theme.planet.background,
                color: theme.planet.text,
                padding: "42px 15px",
                textAlign: "center"
            },
            title: {
                ...Grid.setRowCol(1, 1),
                margin: 0,
                fontSize: 16,
                fontWeight: 700
            },
            planetBox: {
                ...Grid.setRowCol(2, 1),
                ...Grid.define("max-content max-content", "minmax(auto, 262px)"),
                backgroundColor: theme.planet.box,
                color: theme.planet.boxText,
                gridRowGap: 13,
                fontWeight: 400,
                borderRadius: 8,
                justifyContent: "center",
                padding: "30px 0"
            },
            climate: {
                ...Grid.setRowCol(1, 1),
                margin: 0,
                fontSize: 16
            },
            gravity: {
                ...Grid.setRowCol(2, 1),
                margin: 0,
                fontSize: 14
            }
        });

    return (
        <React.Fragment>
            {planet &&
                <div className={css(styles.container)}>
                    <h2 className={css(styles.title)}>{planet.name}</h2>
                    <div className={css(styles.planetBox)}>
                        <h3 className={css(styles.climate)}>{`${translations.getMessage("climate")}${planet.climate}`}</h3>
                        <p className={css(styles.gravity)}>{`${translations.getMessage("gravity")}${planet.gravity}`}</p>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default Planet;
