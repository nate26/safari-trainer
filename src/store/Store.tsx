import createSagaMiddleware from 'redux-saga';
import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import rootSaga from '../sagas/RootSaga';
import rootReducers from '../reducers/RootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducers,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(sagaMiddleware);
    },
} as ConfigureStoreOptions);

sagaMiddleware.run(rootSaga);

export default store;