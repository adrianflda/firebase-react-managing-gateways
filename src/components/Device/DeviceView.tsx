import { Zoom, Fab, SxProps, useTheme } from "@mui/material";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import AddIcon from '@mui/icons-material/Add';

import { FAV_STYLE } from "../../constants/globals";
import DeviceDialog from "./DeviceDialog";
import DeviceTable from "./DevicesTable";
import DeviceList from "./DevicesList";
import { useSelector } from "react-redux";
import { getGatewayStateSelector } from "../../store/selectors/GatewaySelectors";

const DeviceView = () => {
    const theme = useTheme();
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const { elements } = useSelector(getGatewayStateSelector);
    const [openDeviceDialog, setOpenDeviceDialog] = useState(false);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const handleAddNewDevice = (event: any) => {
        event.preventDefault();
        setOpenDeviceDialog(!openDeviceDialog);
    }

    return (
        <>
            <DeviceDialog open={openDeviceDialog} setOpen={setOpenDeviceDialog} />

            {isDesktopOrLaptop && <DeviceTable gateways={elements} />}
            {isTabletOrMobile && <DeviceList gateways={elements} />}

            <Zoom
                key="device-zoom-key"
                in={true}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${transitionDuration.exit}ms`,
                }}
                unmountOnExit
            >
                <Fab
                    sx={FAV_STYLE as SxProps}
                    aria-label="Add Device"
                    color="secondary"
                    onClick={handleAddNewDevice}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
        </>
    );
};

export default DeviceView;
