import React, {useContext, useEffect, useState} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";
import MediaQueryUtils from "../../utils/MediaQuery";
import {useDispatch, useSelector} from "react-redux";
import {PlanetsAppState} from "../../state/reducers/initialState";
import {PlanetsCollection, PlanetsCollectionSort, sortPlanetsCollection, PlanetsCollectionSortField} from "../../models/PlanetsCollection";
import FavoriteIcon from "../favoriteIcon/FavoriteIcon";
import FavoritesCollection from "../../models/FavoritesCollection";
import Loader from "../loader/Loader";
import PlanetsCreator from "../../state/creators/planets.creator";
import Grid from "../../utils/Grid";
import {useNavigate} from "react-router-dom";
import {RouterPaths} from "../pages/Main";
import SortIcon from "../sortIcon/SortIcon";

const populationName: PlanetsCollectionSortField = "population", diameterName: PlanetsCollectionSortField = "diameter";

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
        planetsMessage: string = translations.getMessage("planets"),
        [currentSortField, setCurrentSortField] = useState<PlanetsCollectionSortField | null>(null),
        [populationSort, setPopulationSort] = useState(false),
        [diameterSort, setDiameterSort] = useState(false),
        [currentSort, setCurrentSort] = useState<PlanetsCollectionSort | null>(null);

    useEffect(() => {
        if (currentSortField) {
            setCurrentSort({field: currentSortField!, ascending: !(currentSortField === populationName ? populationSort : diameterSort)});
        }
    }, [diameterSort, populationSort, currentSortField]);

    const filterField = (field: number): string => {
        return field === -1 ? translations.getMessage("unknown") : `${field}`;
    };

    const handleFavoriteAction = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLTableDataCellElement>, planetId: number): void => {
        if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLTableDataCellElement>).key === "Enter")) {
            dispatch(PlanetsCreator.addToFavorites(planetId));
            event.stopPropagation();
        }
    };

    const handleGoToPlanet = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLTableRowElement>, planetId: number): void => {
        if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLTableRowElement>).key === "Enter")) {
            navigate(RouterPaths.Planet.replace(":planetId", `${planetId}`));
        }
    };

    const toggleSort = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLTableHeaderCellElement>, field: PlanetsCollectionSortField) => {
        if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLTableHeaderCellElement>).key === "Enter")) {
            if (field === populationName) {
                setPopulationSort(!populationSort);
            } else {
                setDiameterSort(!diameterSort);
            }

            setCurrentSortField(field);
        }
    };

    return (
        <div className={css(styles.container)}>
            <h2 className={css(styles.title)}>{planetsMessage}</h2>
            {planetsReady && <table className={css(styles.table)} aria-label={planetsMessage}>
                <thead>
                <tr>
                    <th className={css(styles.th)}>{translations.getMessage("planetName")}</th>
                    <th className={css(styles.th)}>{translations.getMessage("planetClimate")}</th>
                    <th className={css(styles.th)}
                        onClick={(e) => toggleSort(e, diameterName)}
                        onKeyDown={(e) => toggleSort(e, diameterName)}
                        role="button"
                        tabIndex={0}
                        aria-label={translations.getMessage("planetDiameter")}>
                        {translations.getMessage("planetDiameter")}
                        <SortIcon upsideDown={diameterSort}/>
                    </th>
                    <th className={css(styles.th)}
                        onClick={(e) => toggleSort(e, populationName)}
                        onKeyDown={(e) => toggleSort(e, populationName)}
                        role="button"
                        tabIndex={0}
                        aria-label={translations.getMessage("planetPopulation")}>
                        {translations.getMessage("planetPopulation")}
                        <SortIcon upsideDown={populationSort}/>
                    </th>
                    <th className={css(styles.th)}>{translations.getMessage("planetFavorite")}</th>
                </tr>
                </thead>
                <tbody>
                {(currentSort ? sortPlanetsCollection(planets, currentSort.field, currentSort.ascending) : Object.values(planets)).map((planet, key) => {
                    return (
                        <tr key={planet.id} className={css(styles.tr)} onClick={(event) => handleGoToPlanet(event, planet.id)}
                            onKeyDown={(event) => handleGoToPlanet(event, planet.id)}
                            tabIndex={0}
                            role="button"
                            aria-label={translations.getMessage("goToPlanet")}
                        >
                            <td className={css(styles.td)}><b>{planet.name}</b></td>
                            <td className={css(styles.td)}>{planet.climate}</td>
                            <td className={css(styles.td)}>{filterField(planet.diameter)}</td>
                            <td className={css(styles.td)}>{filterField(planet.population)}</td>
                            <td className={css(styles.td)}
                                tabIndex={0}
                                onClick={(event) => handleFavoriteAction(event, planet.id)}
                                onKeyDown={(event) => handleFavoriteAction(event, planet.id)}
                                role="button"
                                aria-label={translations.getMessage("addFavorites")}>
                                <FavoriteIcon filled={favorites[planet.id]}/>
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