import React, {useContext} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";
import MediaQueryUtils from "../../utils/MediaQuery";
import {useDispatch, useSelector} from "react-redux";
import {PlanetsAppState} from "../../state/reducers/initialState";
import {PlanetsCollection} from "../../models/PlanetsCollection";
import FavoriteIcon from "../favoriteIcon/FavoriteIcon";
import FavoritesCollection from "../../models/FavoritesCollection";
import Loader from "../loader/Loader";
import PlanetsCreator from "../../state/creators/planets.creator";
import Grid from "../../utils/Grid";
import {useNavigate} from "react-router-dom";
import {RouterPaths} from "../pages/Main";

const PlanetsTable = () => {
    const translations = useContext(TranslationsContext),
        planets: PlanetsCollection = useSelector((state: PlanetsAppState) => state.planetsData.planets),
        favorites: FavoritesCollection = useSelector((state: PlanetsAppState) => state.planetsData.favorites),
        navigate = useNavigate(),
        {theme} = useContext(ThemeContext),
        dispatch = useDispatch(),
        styles = StyleSheet.create({
            container: {
                ...Grid.setRowCol(1, 1),
                overflowX: "auto",
                maxHeight: "100vh",
                overflowY: "scroll",
                ...MediaQueryUtils.mobile({maxWidth: 300})
            },
            table: {
                color: theme.table.text,
                fontSize: 14,
                borderCollapse: 'collapse',
                width: '100%',
                ...MediaQueryUtils.mobile({fontSize: 12})
            },
            th: {
                color: theme.table.thText,
                fontWeight: 400,
                borderBottom: 0,
                borderTop: `1px solid ${theme.table.thBorder}`,
                textAlign: 'left',
                padding: "9px 0 9px 24px",
                ...MediaQueryUtils.mobile({padding: "6px 0 6px 12px"})
            },
            td: {
                borderTop: `0.25px solid ${theme.table.tdBorder}`,
                borderBottom: `0.25px solid ${theme.table.tdBorder}`,
                padding: "19px 0 19px 24px",
                ...MediaQueryUtils.mobile({padding: "8px 0 19px 12px"})
            },
            title: {
                fontSize: 18,
                fontWeight: 400,
                margin: 0,
                padding: 13,
                ...MediaQueryUtils.mobile({padding: 6})
            },
            tr: {
                cursor: "pointer"
            }
        }),
        planetsReady: boolean = planets && Object.keys(planets).length > 0,
        planetsMessage: string = translations.getMessage("planets");

    const filterField = (field: number): string => {
        return field === -1 ? translations.getMessage("unknown") : `${field}`;
    };

    const handleFavoriteAction = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLTableDataCellElement>, planetId: string): void => {
        if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLTableDataCellElement>).key === "Enter")) {
            dispatch(PlanetsCreator.addToFavorites(parseInt(planetId)));
            event.stopPropagation();
        }
    };

    const handleGoToPlanet = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLTableRowElement>, planetId: string): void => {
        if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLTableRowElement>).key === "Enter")) {
            navigate(RouterPaths.Planet.replace(":planetId", planetId));
        }
    };

    return (
        <div className={css(styles.container)}>
            <h2 className={css(styles.title)}>{planetsMessage}</h2>
            {planetsReady && <table className={css(styles.table)} aria-label={planetsMessage}>
                <thead>
                <tr>
                    <th className={css(styles.th)}>Name</th>
                    <th className={css(styles.th)}>Climate</th>
                    <th className={css(styles.th)}>Diameter</th>
                    <th className={css(styles.th)}>Population</th>
                    <th className={css(styles.th)}>Favorite</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(planets).map(([planetKey, planet]) => {
                    return (
                        <tr key={planetKey} className={css(styles.tr)} onClick={(event) => handleGoToPlanet(event, planetKey)}
                            onKeyDown={(event) => handleGoToPlanet(event, planetKey)}
                            tabIndex={0}
                            role="button"
                            aria-label={translations.getMessage("goToPlanet")}
                        >
                            <td className={css(styles.td)}><b>{planet.name}</b></td>
                            <td className={css(styles.td)}>{planet.climate}</td>
                            <td className={css(styles.td)}>{filterField(planet.diameter)}</td>
                            <td className={css(styles.td)}>{filterField(planet.population)}</td>
                            <td
                                className={css(styles.td)}
                                tabIndex={0}
                                onClick={(event) => handleFavoriteAction(event, planetKey)}
                                onKeyDown={(event) => handleFavoriteAction(event, planetKey)}
                                role="button"
                                aria-label={translations.getMessage("addFavorites")}
                            >
                                <FavoriteIcon filled={favorites[parseInt(planetKey)]}/>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>}
            {!planetsReady && <Loader/>}
        </div>
    );
};

export default PlanetsTable;