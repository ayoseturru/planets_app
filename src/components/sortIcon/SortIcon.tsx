import React from 'react';
import {css, StyleSheet} from "aphrodite";

interface SortIconProps {
    upsideDown: boolean;
}

const SortIcon = ({upsideDown}: SortIconProps) => {
    const styles = StyleSheet.create({
        svg: {
            paddingLeft: 5,
            cursor: 'pointer'
        },
    });

    return (
        <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css(styles.svg)}
            role="img"
            aria-label="Sort Icon"
            style={{transform: upsideDown ? 'scaleY(-1)' : ''}}
        >
            <g clipPath="url(#clip0_305_20520)">
                <path
                    d="M7.84335 0.149802L2.84657 3.42322C2.5417 3.62294 2.5417 3.94685 2.84657 4.14657C3.1515 4.34633 3.6458 4.34633 3.95073 4.14657L7.61468 1.74629L7.61468 10.4885C7.61468 10.771 7.96427 11 8.39543 11C8.82653 11 9.17618 10.771 9.17618 10.4885L9.17618 1.74629L12.8401 4.14648C13.1451 4.34624 13.6394 4.34624 13.9443 4.14648C14.0966 4.04664 14.173 3.91571 14.173 3.78481C14.173 3.65392 14.0966 3.52302 13.9443 3.42314L8.94751 0.149802C8.64258 -0.0499584 8.14828 -0.0499584 7.84335 0.149802Z"
                    fill="#4F4F4F"
                    fillOpacity="0.8"
                />
            </g>
            <defs>
                <clipPath id="clip0_305_20520">
                    <rect width="11" height="16.7912" fill="white" transform="translate(0 11) rotate(-90)"/>
                </clipPath>
            </defs>
        </svg>
    );
};

export default SortIcon;
