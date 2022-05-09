import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthStatus = () => {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.
            <Button
                onClick={() => {
                    navigate("/login");
                }}
            >
                Sign in
            </Button>
        </p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <Button
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Sign out
            </Button>
        </p>
    );
}

export default AuthStatus;