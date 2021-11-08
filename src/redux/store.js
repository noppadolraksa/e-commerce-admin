import { configureStore, combineReducers } from "@reduxjs/toolkit"; //2# add combineReducers

import userReducer from "./userRedux";
import productReducer from "./productRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

//we just have 1 reducer
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
}); // 2# combine user and cart

const persistConfig = {
  //1# add this
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer); //1# which reducer do you wanna persist is userReducer
//2# use rootReducer instead of userReducer
export const store = configureStore({
  reducer: persistedReducer,
  //2# change user and cart into persistedReducer
  // {cart: cartReducer,
  // user: persistedReducer,}, //1# add it instead of userReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);

// 1#wrap PersistGate inside index.js
// <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
