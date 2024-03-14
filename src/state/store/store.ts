import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers/root.reducer';
import logMiddleware from '../middlewares/log.middleware';
import createSagaMiddleware from 'redux-saga';
import {Middleware} from "redux";
import {rootSaga} from "../sagas/root.saga";

const sagaMiddleware = createSagaMiddleware(),
    middlewares: Middleware[] = [logMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares, sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
