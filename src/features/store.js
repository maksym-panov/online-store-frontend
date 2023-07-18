import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./auth/userSlice";
import cartReducer from "./cartSlice";

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

const persistedCartReducer = 
    persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        cart: persistedCartReducer
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