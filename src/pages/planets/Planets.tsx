import React from 'react';
import {css, StyleSheet} from "aphrodite";
import PlanetsTable from "../../components/planetsTable/PlanetsTable";
import Grid from "../../utils/Grid";
import {Outlet} from "react-router-dom";

const Planets = () => {
    const styles = StyleSheet.create({
        container: {
            ...Grid.define("max-content", "auto max-content")
        }
    });

    return (
        <div className={css(styles.container)}>
            <PlanetsTable/>
            <Outlet/>
        </div>
    );
};

export default Planets;
