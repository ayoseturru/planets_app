import React, {useContext} from 'react';
import {css, StyleDeclarationValue, StyleSheet} from 'aphrodite';
import {Link, useLocation} from 'react-router-dom';
import {ThemeContext} from "../../providers/ThemeProvider";
import Grid from "../../utils/Grid";
import {TranslationsContext} from "../../providers/TranslationProvider";
import {RouterPaths} from "../pages/Main";

interface NavProps {
    extraStyle: StyleDeclarationValue;
}

const Nav = ({extraStyle}: NavProps) => {
    const {theme} = useContext(ThemeContext),
        location = useLocation(),
        translations = useContext(TranslationsContext),
        styles = StyleSheet.create({
            verticalNavContainer: {
                ...Grid.define("max-content max-content max-content", "minmax(auto, 226px)"),
                backgroundColor: theme.nav.background,
                color: theme.nav.textActive,
                fontSize: 22,
                display: "grid",
                height: "auto"
            },
            title: {
                padding: "16px 24px",
                fontSize: 22,
                fontWeight: 800,
                margin: 0
            },
            navItem: {
                padding: "16px 24px",
                color: theme.nav.text,
                fontSize: 14,
                height: "fit-content",
                textDecoration: 'none',
                transition: 'background-color 0.3s',
                ':hover': {
                    backgroundColor: theme.nav.backgroundActive,
                },
                ':focus': {
                    outline: 'none',
                    backgroundColor: theme.nav.backgroundActive,
                    border: `1px solid ${theme.nav.textActive}`
                }
            }
        });

    const activeLinkStyles = (route: string): StyleDeclarationValue => {
        return StyleSheet.create({activeLink: {backgroundColor: location.pathname === route ? theme.nav.backgroundActive : theme.nav.background}}).activeLink;
    };

    return (
        <nav className={`${css(styles.verticalNavContainer, extraStyle)}`} role="navigation">
            <h3 className={css(styles.title)}>{translations.getMessage("appTitle")}</h3>
            <Link to={RouterPaths.Planets} className={css(styles.navItem, activeLinkStyles(RouterPaths.Planets))}>{translations.getMessage("planets")}</Link>
            <Link to={RouterPaths.Favorites} className={css(styles.navItem, activeLinkStyles(RouterPaths.Favorites))}>{translations.getMessage("favorites")}</Link>
        </nav>
    );
};

export default Nav;