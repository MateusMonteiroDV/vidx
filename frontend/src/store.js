import { configureStore } from '@reduxjs/toolkit'
import authReducer from './context/authSlice.js'
import {apiSlice} from './context/api/apiSlice.js'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
});

export default store;