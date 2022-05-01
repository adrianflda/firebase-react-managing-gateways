import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomeView from '../components/Home/HomeView';
import GatewayList from '../components/Gateway/GatewayList';
import DeviceListPage from '../components/Device/DeviceListPage';
import LoginPage from "../components/Auth/LoginPage";
import RequireAuth from "../components/Auth/RequireAuth";
import Navbar from "../components/Navbar/Navbar";
import { ROUTES } from "../constants/routes";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={ROUTES.HOME.staticRoute} element={<HomeView />} />
                <Route path={ROUTES.LOGIN.staticRoute} element={<LoginPage />} />
                <Route
                    path={ROUTES.GATEWAYS.staticRoute}
                    element={
                        <RequireAuth>
                            <GatewayList />
                        </RequireAuth>
                    }
                />
                <Route
                    path={ROUTES.DEVICES.staticRoute}
                    element={
                        <RequireAuth>
                            <DeviceListPage />
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