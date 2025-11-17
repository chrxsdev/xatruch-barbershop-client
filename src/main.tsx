import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { XatruchApp } from "./XatruchApp.js";
import { store } from "./store/index.js";

import "./styles/styles.css";
import "./styles/modal-styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLHtmlElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <XatruchApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
