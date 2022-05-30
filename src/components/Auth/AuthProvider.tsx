import React from "react";
import { useDispatch } from "react-redux";
import { signinAction, signoutAction } from "../../store/actions/UserActions";
import AuthContext from "../../contexts/AuthContext";
import IUser from "../../models/IUser";
import FireAuthService, { storedUser } from "../../services/FireAuthService";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    let [user, setUser] = React.useState<any>(storedUser());

    const signin = async (email: string, password: string, callback: VoidFunction) => {
        const response = await FireAuthService.loginWithEmail(email, password);
        dispatch(signinAction(response.user as unknown as IUser));
        setUser(response.user);
        callback();
    };

    const signup = async (email: string, password: string, firstName: string, lastName: string, callback: VoidFunction) => {
        const response = await FireAuthService.signup(email, password, firstName, lastName);
        dispatch(signinAction(response.user as unknown as IUser));
        setUser(response.user);
        callback();
    };

    const signout = async (callback: VoidFunction) => {
        await FireAuthService.logout();
        dispatch(signoutAction());
        setUser(null);
        callback();
    };

    const resetPassword = async (email: string, callback: VoidFunction) => {
        await FireAuthService.sendPasswordChangeEmail(email);
        dispatch(signoutAction());
        setUser(null);
        callback();
    }

    let value = { user, signin, signup, signout, resetPassword };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;