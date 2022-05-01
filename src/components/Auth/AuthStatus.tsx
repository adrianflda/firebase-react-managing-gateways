import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthStatus = () => {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.
            <button
                onClick={() => {
                    navigate("/login");
                }}
            >
                Sign in
            </button>
        </p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <button
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
}

export default AuthStatus;