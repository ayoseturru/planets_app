import React from 'react';
import PlanetsTable from "../../planetsTable/PlanetsTable";
import {css, StyleSheet} from "aphrodite";
import Grid from "../../../utils/Grid";
import Planet from "../../planet/Planet";

const Planets = () => {
    const styles = StyleSheet.create({
        container: {
            ...Grid.define("max-content", "auto max-content")
        },
    });

    return (
        <div className={css(styles.container)}>
            <PlanetsTable/>
            <Planet/>
        </div>
    );
};

export default Planets;
