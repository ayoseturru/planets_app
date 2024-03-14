import React from 'react';

interface FavoriteIconProps {
    filled: boolean;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({filled}) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={filled ? '#E4D237' : 'none'}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.075 1.21102L9.94532 5.33688L10.0591 5.58783L10.332 5.6257L14.6901 6.23041L11.4847 9.43337L11.3006 9.61734L11.3457 9.87368L12.1444 14.414L8.32303 12.2309L8.075 12.0892L7.82697 12.2309L4.00565 14.414L4.80435 9.87368L4.84944 9.61734L4.66533 9.43337L1.45992 6.23041L5.818 5.6257L6.09092 5.58783L6.20467 5.33688L8.075 1.21102Z"
                stroke="#E4D237"
            />
        </svg>
    );
};

export default FavoriteIcon;
