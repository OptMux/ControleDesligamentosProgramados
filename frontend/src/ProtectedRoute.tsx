import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "./hooks/useTypedSelector";

interface ProtectedRouteProps {
  preventLoginNavigatingTo?: string;
}

export const ProtectedRoute: React.FC<
  React.PropsWithChildren<ProtectedRouteProps>
> = function ({ preventLoginNavigatingTo, children }) {
  const { user } = useTypedSelector(({ user }) => ({ user }));
  const location = useLocation();

  if (preventLoginNavigatingTo) {
    if (user.loggedUser)
      return (
        <Navigate to={preventLoginNavigatingTo} state={{ from: location }} />
      );
    return children;
  }

  if (user.loggedUser) return children;
  return <Navigate to="/login" state={{ from: location }} />;
};
