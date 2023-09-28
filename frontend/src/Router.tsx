import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/Login";
import { PanelPage } from "./pages/panel/Panel";
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { recoverSession } from "./store/ducks/user/userThunks";
import { useTypedSelector } from "./hooks/useTypedSelector";

export const Router = function () {
  const { user } = useTypedSelector(({ user }) => ({ user }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loggedUser) dispatch(recoverSession({}) as any);
  }, [dispatch, user.loggedUser]);

  return (
    <BrowserRouter basename="/cdp">
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute preventLoginNavigatingTo="/panel">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panel"
          element={
            <ProtectedRoute>
              <PanelPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="login" />} />
      </Routes>
    </BrowserRouter>
  );
};
