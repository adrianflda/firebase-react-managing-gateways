import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to={ROUTES.LOGIN.staticRoute} state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;