import logger from 'redux-logger';
import AuthSlice from './slices/AuthSlice';
import TaskSlice from './slices/TaskSlice';
import { AsyncKey } from '../utils/Constant';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: AsyncKey.ROOT_REDUCER,
    storage: AsyncStorage,
};

const reducers = combineReducers({
    AuthReducer: AuthSlice,
    TaskReducer: TaskSlice
});

export const USER_LOGOUT = 'USER_LOGOUT';

const rootReducer = (state, action) => {
    if (action.type == USER_LOGOUT) {
        AsyncStorage.removeItem(`persist:${AsyncKey.ROOT_REDUCER}`);
        return reducers(undefined, action);
    }
    return reducers(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        __DEV__
            ? getDefaultMiddleware({
                serializableCheck: false,
            }).concat(logger)
            : getDefaultMiddleware(),
});

export const persistor = persistStore(store);
