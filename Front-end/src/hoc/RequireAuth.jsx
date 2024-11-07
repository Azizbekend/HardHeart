import { useLocation, Navigate } from "react-router-dom";
import { Errors } from "../views/Imports/pages";
import { useAuth } from '../hook/useAuth'

const RequireAuth = ({ role, children }) => {
    const { user } = useAuth();

    const hasAccess = role.some(element => user.role === element);
    if (!hasAccess) {
        return <Navigate to={"/error/403"} />
    }

    return children;
}
export { RequireAuth };