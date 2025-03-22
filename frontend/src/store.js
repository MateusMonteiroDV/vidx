import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './context/authSlice.js'
import {apiSlice} from './context/api/apiSlice.js'

const persitedConfig= {
  key:'root',
  storage
}

const persiteReducer = persistReducer(persitedConfig,authReducer)
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persiteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
});

export const persistor = persistStore(store);

export default store;