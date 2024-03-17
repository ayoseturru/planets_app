import React, {useContext, useState} from 'react';
import {css, StyleSheet} from "aphrodite";
import {useDispatch, useSelector} from "react-redux";
import {ThemeContext} from "../../providers/ThemeProvider";
import {TranslationsContext} from "../../providers/TranslationProvider";
import FavoritesCollection from "../../models/FavoritesCollection";
import {PlanetsAppState} from "../../state/reducers/initialState";
import {PlanetsCollection} from "../../models/PlanetsCollection";
import Grid from "../../utils/Grid";
import PlanetsCreator from "../../state/creators/planets.creator";
import Favorite from "../../components/favorite/Favorite";
import ConfirmationModal from "../../components/cconfirmationModal/ConfirmationModal";

const Favorites = () => {
    const {theme} = useContext(ThemeContext),
        translations = useContext(TranslationsContext),
        dispatch = useDispatch(),
        [modalEnabled, setModalEnabled] = useState(false),
        [currentPlanet, setCurrentPlanet] = useState<number>(-1),
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

    const toggleModalEnabled = (planetId: number): void => {
        setCurrentPlanet(planetId);
        setModalEnabled(!modalEnabled);
    };

    const deleteFavorite = (): void => {
        if (currentPlanet < 0) return;

        dispatch(PlanetsCreator.removeFromFavorites(currentPlanet));
        setModalEnabled(false);
    };

    return (
        <React.Fragment>
            <div className={css(styles.container)}>
                <h2 className={css(styles.title)}>{translations.getMessage("favorites")}</h2>
                <div className={css(styles.favoritesWrapper)}>
                    {Object.keys(favorites).map((id, index) => {
                        const planetId: number = parseInt(id);

                        return (
                            <Favorite key={planetId} planet={planets[planetId]} onInteraction={() => toggleModalEnabled(planetId)}/>
                        );
                    })}
                </div>
            </div>
            <ConfirmationModal onConfirm={deleteFavorite} onCancel={() => toggleModalEnabled(-1)} isOpen={modalEnabled}/>
        </React.Fragment>
    );
};

export default Favorites;
