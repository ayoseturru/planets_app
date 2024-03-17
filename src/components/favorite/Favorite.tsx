import React, {useContext} from 'react';
import {css, StyleSheet} from "aphrodite";
import {ThemeContext} from "../../providers/ThemeProvider";
import Planet from "../../models/Planet";
import Grid from "../../utils/Grid";
import CloseIcon from "../closeIcon/CloseIcon";
import favoriteImage from './favorite.png';
import {TranslationsContext} from "../../providers/TranslationProvider";

interface FavoriteProps {
    planet: Planet;
}

const Favorite = ({planet}: FavoriteProps) => {
    const {theme} = useContext(ThemeContext),
        translations = useContext(TranslationsContext),
        styles = StyleSheet.create({
            container: {
                ...Grid.define("max-content max-content max-content", "auto"),
                maxWidth: 328,
                borderRadius: 8,
                boxShadow: `0 2px 2px ${theme.favorite.boxShadow}`,
                overflow: "hidden",
                padding: "16px 0 38px 0",
                border: `1px solid ${theme.favorite.border}`
            },
            titleBox: {
                ...Grid.setRowCol(1, 1),
                ...Grid.define("max-content 5px max-content", "auto max-content"),
                padding: "0 14px"
            },
            title: {
                ...Grid.setRowCol(1, 1),
                color: theme.favorite.mainText,
                fontWeight: 700,
                fontSize: 16,
                margin: 0
            },
            subtitle: {
                ...Grid.setRowCol(3, 1),
                color: theme.favorite.secondaryText,
                fontWeight: 400,
                fontSize: 12,
                margin: 0
            },
            image: {
                ...Grid.setRowCol(2, 1),
                maxHeight: 200,
                padding: "15px 0",
                width: "auto"
            },
            descriptionArea: {
                ...Grid.setRowCol(3, 1),
                ...Grid.define("max-content 11px max-content", "auto"),
                paddingLeft: 8,
                overflow: "hidden"
            },
            climate: Grid.setRowCol(1, 1),
            gravity: Grid.setRowCol(3, 1),
            common: {
                fontWeight: 400,
                fontSize: 12,
                margin: 0
            }
        });

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.titleBox)}>
                <h2 className={css(styles.title)}>{planet.name}</h2>
                <CloseIcon/>
                <h3 className={css(styles.subtitle)}>{planet.climate}</h3>
            </div>
            <img className={css(styles.image)} src={favoriteImage} alt={translations.getMessage("favorite")}/>
            <div className={css(styles.descriptionArea)}>
                <h4 className={css(styles.climate, styles.common)}>{`${translations.getMessage("climate")}${planet.climate}`}</h4>
                <h4 className={css(styles.gravity, styles.common)}>{`${translations.getMessage("gravity")}${planet.gravity}`}</h4>
            </div>
        </div>
    );
};

export default Favorite;
