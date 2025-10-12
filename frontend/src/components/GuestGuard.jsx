import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken, isTokenValid } from "../auth/Session";

export default function GuestGuard() {
  const location = useLocation();
  const authed = isTokenValid(getToken());

  if (authed) {
    const from = location.state?.from?.pathname ?? "/";
    return <Navigate to={from} replace />;
  }
  return <Outlet />;
}
