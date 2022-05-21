import React from "react";
import AuthContext from "../../contexts/AuthContext";
import FireAuthService from "../../services/FireAuthService";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    let [user, setUser] = React.useState<any>(null);

    const signin = async (email: string, password: string, callback: VoidFunction) => {
        await FireAuthService.loginWithEmail(email, password);
        setUser(email);
        callback();
    };

    const signout = async (callback: VoidFunction) => {
        await FireAuthService.logout();
        setUser(null);
        callback();
    };

    let value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;