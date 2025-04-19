import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './context/authSlice.js';
import courseReducer from './context/courseSlice.js';
import { apiSlice } from './context/api/apiSlice.js';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isAdmin']
}
const coursePersistConfig = {
  key: 'course',
  storage,
  whitelist: ['instructorCourses','selectedCourse'] 
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCourseReducer = persistReducer(coursePersistConfig, courseReducer);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
    course: persistedCourseReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);
export default store;