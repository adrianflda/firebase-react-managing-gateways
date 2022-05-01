import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomeView from '../components/Home/HomeView';
import GatewayList from '../components/Gateway/GatewayList';
import DeviceListPage from '../components/Device/DeviceListPage';
import { RouterPathEnum } from '../enums/RouterPathEnum';
import LoginPage from "../components/Auth/LoginPage";
import RequireAuth from "../components/Auth/RequireAuth";
import Navbar from "../components/Navbar/Navbar";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={RouterPathEnum.HOME} element={<HomeView />} />
                <Route path={RouterPathEnum.LOGIN} element={<LoginPage />} />
                <Route
                    path={RouterPathEnum.GATEWAY}
                    element={
                        <RequireAuth>
                            <GatewayList />
                        </RequireAuth>
                    }
                />
                <Route
                    path={RouterPathEnum.DEVICE}
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
                            <Link to={RouterPathEnum.HOME}>Home</Link>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;