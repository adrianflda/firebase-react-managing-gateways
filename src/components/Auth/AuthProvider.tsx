import React from "react";
import { useDispatch } from "react-redux";
import { signinAction, signoutAction } from "../../actions/UserActions";
import AuthContext from "../../contexts/AuthContext";
import FireAuthService from "../../services/FireAuthService";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    let [user, setUser] = React.useState<any>(null);

    const signin = async (email: string, password: string, callback: VoidFunction) => {
        const response = await FireAuthService.loginWithEmail(email, password);
        dispatch(signinAction(response.user));
        setUser(response.user);
        callback();
    };

    const signout = async (callback: VoidFunction) => {
        await FireAuthService.logout();
        dispatch(signoutAction());
        setUser(null);
        callback();
    };

    let value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;