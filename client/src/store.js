import { configureStore } from "@reduxjs/toolkit";
import pizzasReducer from "./features/pizzas/pizzaSlice";
import cartReducer from "./features/cart/cartSlice";
import loginReducer from "./features/auth/loginSlice";
import userReducer from "./features/auth/userSlice";
import reviewReducer from "./features/review/reviewSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // whiteList: ["cartReducer"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedPizzasReducer = persistReducer(persistConfig, pizzasReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    pizzas: persistedPizzasReducer,
    reviews: reviewReducer,
    login: loginReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
