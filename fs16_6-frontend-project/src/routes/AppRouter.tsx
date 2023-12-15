import React from "react";
import { Route, Routes } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// routers
import { routers } from "./routers";

// route components
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import PublicRoute from "./PublicRoute";

// loader
import AppLoading from "../components/AppLoading";

// layouts
import AdminDashboardLayout from "../components/layout/admin/AdminDashboardLayout";
import AppLayout from "../components/layout/AppLayout";

function AppRouter() {
  // Auth States
  const auth = useSelector((state: AppState) => state.auth);
  const websiteSetting = useSelector((state: AppState) => state.setting);
  const { access_token, user } = auth;

  // we fetch current user from api based on access_token else app is ready almost instantly
  if (access_token && !user) return <AppLoading />;
  if (!websiteSetting.data && websiteSetting.isLoading) return <AppLoading />;
  // layout for our app
  const Layout =
    user?.role && user?.role === "ADMIN" ? AdminDashboardLayout : AppLayout;

  return (
    <Routes>
      <Route element={<Layout />}>
        {routers.map((router) => {
          return (
            <Route
              key={router.path}
              path={router.path}
              element={
                router.role === "ADMIN" ? (
                  <AdminRoute
                    Component={router.Component}
                    userRole={user?.role ?? null}
                  />
                ) : router.role === "USER" ? (
                  <UserRoute
                    Component={router.Component}
                    userRole={user?.role ?? null}
                  />
                ) : (
                  <PublicRoute
                    Component={router.Component}
                    userRole={"public"}
                  />
                )
              }
            />
          );
        })}
      </Route>
    </Routes>
  );
}

export default AppRouter;
