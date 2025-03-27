import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          ProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnHover={false}
        />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
