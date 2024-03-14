import {Middleware} from 'redux';
import Logger from "../../utils/Logger";

const logMiddleware: Middleware = (store) => (next) => (action) => {
    Logger.log('State before action:', store.getState());
    Logger.log('Action:', action);

    const result = next(action);

    Logger.log('State after action:', store.getState());

    return result;
};

export default logMiddleware;
