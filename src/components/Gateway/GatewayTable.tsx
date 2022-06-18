import React, { } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

import IGateway from '../../models/IGateway';
import GatewayTableRow from './GatewayTableRow';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Fab, Grid, styled, SxProps, useTheme, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GatewayAddDialog from './GatewayAddDialog';
import { FAV_STYLE } from '../../constants/globals';
import Title from '../MainLayout/Title';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function GatewayTable({ gateways }: { gateways: IGateway[] }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openGatewayDialog, setOpenGatewayDialog] = React.useState(false);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

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

    return (
        <>
            <GatewayAddDialog open={openGatewayDialog} setOpen={setOpenGatewayDialog} />
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Gateways</Title>

                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Devices</StyledTableCell>
                                <StyledTableCell align="left">Picture</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="center">Serial</StyledTableCell>
                                <StyledTableCell align="center">Address</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gateways
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: IGateway) => {
                                    return (
                                        <GatewayTableRow key={row.name} row={row} onClickItem={(e) => handleOnClickItem(e, row)} />
                                    );
                                })}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={gateways.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>

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
