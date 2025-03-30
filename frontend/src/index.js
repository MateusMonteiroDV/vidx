import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from './store.js'
import store from './store.js'
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store ={store}>
      <PersistGate loading={null} persistor = {persistor}>
        <App />
      </PersistGate>  
    </Provider>
  </React.StrictMode>
);