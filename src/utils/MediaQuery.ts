import {CSSProperties} from "aphrodite/typings/css-properties";

export default class MediaQueryUtils {
    static mobile(styles: CSSProperties): CSSProperties {
        return {
            [`@media (width <= 600px)`]: {...styles},
        }
    }
}