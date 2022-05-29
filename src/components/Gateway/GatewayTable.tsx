import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

import IGateway from '../../models/IGateway';
import FirestoreService from '../../services/GatewayService';
import GatewayTableRow from './GatewayTableRow';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Fab, Grid, SxProps, useTheme, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GatewayDialog from './GatewayDialog';
import { FAV_STYLE } from '../../constants/globals';
import { getGatewayStateSelector } from '../../store/selectors/GatewaySelectors';
import { getGateways } from '../../store/actions/GatewayActions';

interface Column {
    id: 'name' | 'serial' | 'address' | 'deleted' | 'devices';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: 'devices',
        label: 'Devices',
        minWidth: 170
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: 170
    },
    {
        id: 'serial',
        label: 'Serial',
        minWidth: 100,
        align: 'center'
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'deleted',
        label: 'Deleted',
        minWidth: 170,
        align: 'center'
    }
];

export default function GatewayTable() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { elements, loading, error } = useSelector(getGatewayStateSelector);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openGatewayDialog, setOpenGatewayDialog] = React.useState(false);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    React.useEffect(() => {
        dispatch(getGateways());
    }, [dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
            <GatewayDialog open={openGatewayDialog} setOpen={setOpenGatewayDialog} />
            <Paper sx={{
                width: '100%',
                overflow: 'hidden',
                margin: 'auto',
                maxWidth: '80%',
            }}>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item alignSelf="center">
                        Gateway list ...
                    </Grid>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {elements
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: IGateway) => {
                                        return (
                                            <GatewayTableRow key={row.name} row={row} onClickItem={(e) => handleOnClickItem(e, row)} />
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={elements.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Paper>
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
