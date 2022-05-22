import IUser from "./IUser";

interface AuthContextType {
    user: IUser;
    signin: (user: string, password: string, callback: VoidFunction) => void;
    signup: (user: string, password: string, firstName: string, lastName: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
    resetPassword: (user: string, callback: VoidFunction) => void;
}

export default AuthContextType;