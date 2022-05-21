interface AuthContextType {
    user: any;
    signin: (user: string, password: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export default AuthContextType;