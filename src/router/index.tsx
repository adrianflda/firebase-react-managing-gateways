import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import GatewayView from '../components/Gateway/GatewayView';
import DeviceView from '../components/Device/DeviceView';
import LoginPage from "../components/Auth/LoginPage";
import RequireAuth from "../components/Auth/RequireAuth";
import { ROUTES } from "../constants/routes";
import GatewayDetails from "../components/Gateway/GatewayDetails";
import SignUpPage from "../components/Auth/SignupPage";
import ResetPasswordPage from "../components/Auth/ResetPasswordPage";
import MainLayout from "../components/MainLayout/MainLayout";
import DeviceDetails from "../components/Device/DeviceDetails";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LOGIN.staticRoute} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP.staticRoute} element={<SignUpPage />} />
                <Route path={ROUTES.RESET_PASSWORD.staticRoute} element={<ResetPasswordPage />} />
                <Route
                    path={ROUTES.HOME.staticRoute}
                    element={
                        <RequireAuth>
                            <MainLayout />
                        </RequireAuth>
                    }
                />
                <Route
                    path={ROUTES.GATEWAYS.staticRoute}
                    element={
                        <RequireAuth>
                            <MainLayout children={<GatewayView />} />
                        </RequireAuth>
                    }
                />
                <Route
                    path={ROUTES.GATEWAYS_DETAILS.staticRoute}
                    element={
                        <RequireAuth>
                            <MainLayout children={<GatewayDetails />} />
                        </RequireAuth>
                    }
                />
                <Route
                    path={ROUTES.DEVICES.staticRoute}
                    element={
                        <RequireAuth>
                            <MainLayout children={<DeviceView />} />
                        </RequireAuth>
                    }
                />
                <Route
                    path={ROUTES.DEVICES_DETAILS.staticRoute}
                    element={
                        <RequireAuth>
                            <MainLayout children={<DeviceDetails />} />
                        </RequireAuth>
                    }
                />
                <Route
                    path="*"
                    element={
                        <div>
                            <h2>404 Page not found etc</h2>
                            <Link to={ROUTES.HOME.staticRoute}>Home</Link>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;