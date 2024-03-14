import React, {useContext} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";

const Loader = () => {
    const {theme} = useContext(ThemeContext),
        keyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, styles = StyleSheet.create({
            loaderContainer: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
            },
            spinner: {
                border: `5px solid ${theme.spinner.border}`,
                borderTop: `5px solid ${theme.spinner.borderTop}`,
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                animationName: 'spin',
                animationDuration: '1s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
            },
            message: {
                marginTop: '20px',
                fontSize: '20px',
                fontWeight: 'bold',
            },
        });

    return (
        <div className={css(styles.loaderContainer)}>
            <style>{keyframes}</style>
            <div className={css(styles.spinner)}></div>
            <div className={css(styles.message)}>{useContext(TranslationsContext).getMessage("loading")}</div>
        </div>
    );
};

export default Loader;
