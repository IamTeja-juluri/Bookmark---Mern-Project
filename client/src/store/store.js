import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jsonServerApi } from '../services/jsonServerApi';
import { userReducer } from "./reducers/userReducers";
import searchReducer from './reducers/searchReducers';


const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: {
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
    user: userReducer,
    search: searchReducer,
  },
  preloadedState: initialState,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerApi.middleware),
});

setupListeners(store.dispatch);