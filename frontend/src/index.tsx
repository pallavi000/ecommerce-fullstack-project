import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// context & providers
import ThemeContextProvider from "./context/ThemeContext";
import ToastrProvider from "./context/ToastrProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomizeThemeColorContext from "./context/CustomizeThemeColorContext";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider>
          <CustomizeThemeColorContext>
            <GoogleOAuthProvider clientId="636134274529-2qocgmf3ug0qn5pdt3buo4ucd3vlej8v.apps.googleusercontent.com">
              <ToastrProvider>
                <App />
              </ToastrProvider>
            </GoogleOAuthProvider>
          </CustomizeThemeColorContext>
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
