import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import IGateway from '../../models/IGateway';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Fab, SxProps, useTheme, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GatewayAddDialog from './GatewayAddDialog';
import { FAV_STYLE } from '../../constants/globals';
import { getGatewayStateSelector } from '../../store/selectors/GatewaySelectors';
import { getGateways } from '../../store/actions/GatewayActions';
import GatewayList from './GatewayList';
import GatewayTable from './GatewayTable';

export default function GatewayView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { elements, loading, error } = useSelector(getGatewayStateSelector);
    const [openGatewayDialog, setOpenGatewayDialog] = React.useState(false);
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    React.useEffect(() => {
        dispatch(getGateways());
    }, [dispatch]);

    const handleOnClickItem = (e: any, row: IGateway) => {
        e.preventDefault();
        if (!row) {
            return;
        }
        if (typeof ROUTES.GATEWAYS_DETAILS.dynamicRoute === 'function') {
            const gatewayDetailsRoute = ROUTES.GATEWAYS_DETAILS.dynamicRoute(row.serial);
            navigate(gatewayDetailsRoute);
        }
    }

    const handleAddNewGateway = (event: any) => {
        event.preventDefault();
        setOpenGatewayDialog(!openGatewayDialog);
    }

    if (error) {
        return <React.Fragment>{error}</React.Fragment>;
    } else if (loading) {
        return <React.Fragment>{loading}</React.Fragment>;
    }

    return (
        <>
            <GatewayAddDialog open={openGatewayDialog} setOpen={setOpenGatewayDialog} />

            {isDesktopOrLaptop && <GatewayTable gateways={elements} />}
            {isTabletOrMobile && <GatewayList gateways={elements} />}

            <Zoom
                key="add-new-gateway"
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
                    color="primary"
                    onClick={handleAddNewGateway}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
        </>
    );
}
