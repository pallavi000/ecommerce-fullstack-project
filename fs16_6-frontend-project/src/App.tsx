import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "./redux/store";

// Reducer
import { getCurrentUser } from "./redux/reducers/authReducer";
import AppRouter from "./routes/AppRouter";

// components
import ScrollToTopOnNavigation from "./components/ScrollToTopOnNavigation";
import { getCartItems } from "./redux/reducers/cartReducer";
import SettingsDrawer from "./components/SettingsDrawer";
import ScrollToTopButton from "./components/ScrollToTopButton";

//reducers
import { getWebsiteSetting } from "./redux/reducers/settingReducer";

const App = () => {
  // App Dispatch
  const dispatch = useAppDispatch();

  // Auth States
  const { access_token, user, cart, setting } = useSelector(
    (state: AppState) => ({
      access_token: state.auth.access_token,
      user: state.auth.user,
      cart: state.cart.items,
      setting: state.setting.data,
    })
  );

  useEffect(() => {
    dispatch(getWebsiteSetting());
  }, []);

  useEffect(() => {
    if (setting?.websiteName) {
      document.title = setting.websiteName;
    }
    return () => {
      document.title = "Ecommerce";
    };
  }, [setting]);

  // Get current user
  useEffect(() => {
    if (access_token && !user) {
      dispatch(getCurrentUser());
    }
  }, [access_token, user, dispatch]);

  useEffect(() => {
    if (access_token || user) {
      dispatch(getCartItems());
    }
  }, [access_token, user, dispatch]);

  return (
    <Router>
      <ScrollToTopOnNavigation />
      <SettingsDrawer />
      <AppRouter />
      <ScrollToTopButton />
    </Router>
  );
};

export default App;
