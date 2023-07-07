import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./auth/userSlice";
import {
    FLUSH,
    PAUSE,
    PURGE,
    PERSIST,
    REGISTER,
    REHYDRATE
} from "redux-persist";

const persistConfig = {
    key: "root",
    storage
};

const persistedUserReducer = 
    persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware
        (
            {
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                }
            }
        ),
});

export const persistor = persistStore(store);