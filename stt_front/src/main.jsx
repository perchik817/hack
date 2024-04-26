import React, {} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
// const store = createStore(rootReducer, applyMiddleware(thunk));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
