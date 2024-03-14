import React, {useContext} from 'react';
import {css, StyleSheet} from 'aphrodite';
import Planet from "../../models/Planet";
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";
import MediaQueryUtils from "../../utils/MediaQuery";
import FavoriteIcon from "../favoriteIcon/FavoriteIcon";

const planets: Planet[] = [
    {name: 'Earth', climate: 'Temperate', diameter: 12742, population: 7800000000},
    {name: 'Mars', climate: 'Arid', diameter: 6787, population: 0}
];

const PlanetsTable = () => {
    const translations = useContext(TranslationsContext),
        {theme} = useContext(ThemeContext),
        styles = StyleSheet.create({
            table: {
                color: theme.table.text,
                fontSize: 14,
                borderCollapse: 'collapse',
                width: '100%',
                ...MediaQueryUtils.mobile(
                    {
                        fontSize: 12
                    }
                )
            },
            th: {
                color: theme.table.thText,
                fontWeight: 400,
                borderBottom: 0,
                borderTop: `1px solid ${theme.table.thBorder}`,
                textAlign: 'left',
                padding: "9px 0 9px 24px",
                ...MediaQueryUtils.mobile(
                    {
                        padding: "6px 0 6px 12px"
                    }
                )
            },
            td: {
                borderTop: `0.25px solid ${theme.table.tdBorder}`,
                borderBottom: `0.25px solid ${theme.table.tdBorder}`,
                padding: "19px 0 19px 24px",
                ...MediaQueryUtils.mobile(
                    {
                        padding: "8px 0 19px 12px"
                    }
                )
            },
            title: {
                fontSize: 18,
                fontWeight: 400,
                margin: 0,
                padding: 13,
                ...MediaQueryUtils.mobile(
                    {
                        padding: 6
                    }
                )
            },
            favorite: {
                ...MediaQueryUtils.mobile(
                    {
                        display: "none"
                    }
                )
            }
        });

    return (
        <div>
            <h2 className={css(styles.title)}>{translations.getMessage("planets")}</h2>
            <table className={css(styles.table)}>
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
                {planets.map((planet, index) => (
                    <tr key={planet.name}>
                        <td className={css(styles.td)}><b>{planet.name}</b></td>
                        <td className={css(styles.td)}>{planet.climate}</td>
                        <td className={css(styles.td)}>{planet.diameter}</td>
                        <td className={css(styles.td)}>{planet.population}</td>
                        <td className={css(styles.td, styles.favorite)}>
                            <FavoriteIcon filled={true}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanetsTable;