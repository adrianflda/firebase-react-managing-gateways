import IUser from "./IUser";

interface AuthContextType {
    user: IUser;
    signin: (user: string, password: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export default AuthContextType;