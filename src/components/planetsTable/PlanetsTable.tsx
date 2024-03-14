import React, {useContext} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";
import MediaQueryUtils from "../../utils/MediaQuery";
import {useSelector} from "react-redux";
import {PlanetsAppState} from "../../state/reducers/initialState";
import {PlanetsCollection} from "../../models/PlanetsCollection";
import FavoriteIcon from "../favoriteIcon/FavoriteIcon";
import FavoritesCollection from "../../models/FavoritesCollection";
import Loader from "../loader/Loader";

const PlanetsTable = () => {
    const translations = useContext(TranslationsContext),
        planets: PlanetsCollection = useSelector((state: PlanetsAppState) => state.planetsData.planets),
        favorites: FavoritesCollection = useSelector((state: PlanetsAppState) => state.planetsData.favorites),
        {theme} = useContext(ThemeContext),
        styles = StyleSheet.create({
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
            favorite: MediaQueryUtils.mobile({display: "none"})
        }),
        planetsReady: boolean = Object.keys(planets).length > 0,
        planetsMessage: string = translations.getMessage("planets");

    const filterField = (field: string | number): string => {
        const tempValue: string = `${field}`;

        return tempValue === "NaN" ? translations.getMessage("unknown") : tempValue;
    };

    return (
        <div>
            <h2 className={css(styles.title)}>{planetsMessage}</h2>
            {planetsReady && <table className={css(styles.table)} aria-label={planetsMessage}>
                <thead>
                <tr>
                    <th className={css(styles.th)}>Name</th>
                    <th className={css(styles.th)}>Climate</th>
                    <th className={css(styles.th)}>Diameter</th>
                    <th className={css(styles.th)}>Population</th>
                    <th className={css(styles.th, styles.favorite)}>Favorite</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(planets).map(([planetKey, planet]) => {
                    return (
                        <tr key={planetKey}>
                            <td className={css(styles.td)}><b>{planet.name}</b></td>
                            <td className={css(styles.td)}>{planet.climate}</td>
                            <td className={css(styles.td)}>{filterField(planet.diameter)}</td>
                            <td className={css(styles.td)}>{filterField(planet.population)}</td>
                            <td className={css(styles.td, styles.favorite)}>
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