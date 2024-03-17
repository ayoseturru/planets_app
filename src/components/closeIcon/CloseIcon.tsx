import React from 'react';
import {css, StyleSheet} from "aphrodite";
import Grid from "../../utils/Grid";

const ClosedIcon = () => {
    const styles = StyleSheet.create({
        icon: {
            ...Grid.setRowCol(1, 2),
            padding: "0 6px",
            cursor: "pointer"
        }
    });

    return (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={css(styles.icon)}>
            <path
                d="M6.55023 0.370384L3.66003 3.35185L0.895489 0.500014C0.756508 0.356644 0.531575 0.356903 0.392845 0.500014C0.254115 0.643124 0.253864 0.87516 0.392845 1.01853L3.15739 3.87037L0.267184 6.85184C0.128455 6.99495 0.128203 7.22699 0.267184 7.37036C0.406166 7.51373 0.631099 7.51347 0.769828 7.37036L3.66003 4.38889L6.67589 7.49999C6.81487 7.64336 7.03981 7.6431 7.17854 7.49999C7.31727 7.35688 7.31752 7.12484 7.17854 6.98147L4.16267 3.87037L7.05288 0.888901C7.1916 0.745791 7.19186 0.513755 7.05287 0.370385C6.91389 0.227015 6.68896 0.227274 6.55023 0.370384Z"
                fill="#828282"
            />
        </svg>
    );
};

export default ClosedIcon;
