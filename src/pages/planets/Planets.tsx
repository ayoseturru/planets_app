import React from 'react';
import {css, StyleSheet} from "aphrodite";
import PlanetsTable from "../../components/planetsTable/PlanetsTable";
import Planet from "../../components/planet/Planet";
import Grid from "../../utils/Grid";

const Planets = () => {
    const styles = StyleSheet.create({
        container: {
            ...Grid.define("max-content", "auto max-content")
        }
    });

    return (
        <div className={css(styles.container)}>
            <PlanetsTable/>
            <Planet/>
        </div>
    );
};

export default Planets;
