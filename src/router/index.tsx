import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import GatewayList from '../components/Gateway/GatewayTable';
import DeviceListPage from '../components/Device/DeviceListPage';
import LoginPage from "../components/Auth/LoginPage";
import RequireAuth from "../components/Auth/RequireAuth";
import { ROUTES } from "../constants/routes";
import GatewayDetails from "../components/Gateway/GatewayDetails";
import SignUpPage from "../components/Auth/SignupPage";
import ResetPasswordPage from "../components/Auth/ResetPasswordPage";
import MainLayout from "../components/MainLayout/MainLayout";

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
                            <MainLayout children={<GatewayList />} />
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
                            <MainLayout children={<DeviceListPage />} />
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