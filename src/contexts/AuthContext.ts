import React from "react";
import AuthContextType from "../models/IAuthContextType";

const AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;