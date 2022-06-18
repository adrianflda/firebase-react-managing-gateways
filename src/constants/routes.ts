interface IRoute {
    name: string;
    isNavbarItem?: boolean;
    staticRoute: string;
    dynamicRoute?: (param: string) => string;
}

interface IRoutes {
    HOME: IRoute;
    LOGIN: IRoute;
    SIGNUP: IRoute;
    RESET_PASSWORD: IRoute;
    GATEWAYS: IRoute;
    GATEWAYS_DETAILS: IRoute;
    DEVICES: IRoute;
    DEVICES_DETAILS: IRoute;
}

export const ROUTES: IRoutes = {
    HOME: {
        name: "Home",
        staticRoute: '/',
        isNavbarItem: true
    },
    LOGIN: {
        name: "Login",
        staticRoute: '/login'
    },
    SIGNUP: {
        name: "Signup",
        staticRoute: '/signup'
    },
    RESET_PASSWORD: {
        name: "Reset Password",
        staticRoute: '/resetPassword'
    },
    GATEWAYS: {
        name: "Gateways",
        staticRoute: '/gateways',
        isNavbarItem: true
    },
    GATEWAYS_DETAILS: {
        name: "Gateways Details",
        staticRoute: '/gateways/:serial',
        dynamicRoute: (serial: string) => `${ROUTES.GATEWAYS.staticRoute}/${serial}`
    },
    DEVICES: {
        name: 'Devices',
        staticRoute: '/devices',
        isNavbarItem: true
    },
    DEVICES_DETAILS: {
        name: "Devices Details",
        staticRoute: '/devices/:uuid',
        dynamicRoute: (uuid: string) => `${ROUTES.DEVICES.staticRoute}/${uuid}`
    }
}

export const PAGE_LINKS = Object.values(ROUTES).filter((route) => route.isNavbarItem);
