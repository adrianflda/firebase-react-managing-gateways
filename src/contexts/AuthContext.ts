import React from "react";
import AuthContextType from "../interfaces/IAuthContextType";

const AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;