import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from './store.js'
import store from './store.js'
import {SidebarProvider} from './components/ui/sidebar'

import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store ={store}>
      <PersistGate loading={null} persistor = {persistor}>
        <SidebarProvider>  
          <App />
        </SidebarProvider>  
      </PersistGate>  
    </Provider>
  </React.StrictMode>
);