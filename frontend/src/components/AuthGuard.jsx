import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken, isTokenValid } from "..Session.jsx";

export default function AuthGuard() {
  const location = useLocation();
  const authed = isTokenValid(getToken());

  if (!authed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}