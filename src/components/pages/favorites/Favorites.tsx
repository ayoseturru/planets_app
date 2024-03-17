import React, {useContext, useState} from 'react';
import {css, StyleSheet} from "aphrodite";
import Grid from "../../../utils/Grid";
import {ThemeContext} from "../../../providers/ThemeProvider";
import {TranslationsContext} from "../../../providers/TranslationProvider";
import FavoritesCollection from "../../../models/FavoritesCollection";
import {useSelector} from "react-redux";
import {PlanetsAppState} from "../../../state/reducers/initialState";
import Favorite from "../../favorite/Favorite";
import {PlanetsCollection} from "../../../models/PlanetsCollection";
import ConfirmationModal from "../../cconfirmationModal/ConfirmationModal";

const Favorites = () => {
    const {theme} = useContext(ThemeContext),
        translations = useContext(TranslationsContext),
        [modalEnabled, setModalEnabled] = useState(false),
        favorites: FavoritesCollection = useSelector((state: PlanetsAppState) => state.planetsData.favorites),
        planets: PlanetsCollection = useSelector((state: PlanetsAppState) => state.planetsData.planets),
        styles = StyleSheet.create({
            container: {
                ...Grid.setRowCol(1, 1),
                ...Grid.define("max-content max-content", "auto")
            },
            title: {
                ...Grid.setRowCol(1, 1),
                borderBottom: `1px solid ${theme.favorites.border}`,
                fontSize: 18,
                fontWeight: 400,
                margin: 0,
                padding: 13
            },
            favoritesWrapper: {
                ...Grid.setRowCol(2, 1),
                gridGap: 62,
                padding: 23,
                gridTemplateColumns: "repeat(auto-fill, minmax(328px, 1fr))",
                display: "grid"
            }
        });

    const toggleModalEnabled = (): void => {
        setModalEnabled(!modalEnabled);
    };

    const deleteFavorite = (): void => {
        setModalEnabled(false);
    };

    return (
        <React.Fragment>
            <div className={css(styles.container)}>
                <h2 className={css(styles.title)}>{translations.getMessage("favorites")}</h2>
                <div className={css(styles.favoritesWrapper)}>
                    {Object.keys(favorites).map((planetId, index) => {
                        return (
                            <Favorite key={planetId} planet={planets[parseInt(planetId)]} onInteraction={toggleModalEnabled}/>
                        );
                    })}
                </div>
            </div>
            <ConfirmationModal onConfirm={deleteFavorite} onCancel={toggleModalEnabled} isOpen={modalEnabled}/>
        </React.Fragment>
    );
};

export default Favorites;
