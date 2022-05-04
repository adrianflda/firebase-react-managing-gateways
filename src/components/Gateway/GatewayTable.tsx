import * as React from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

import IGateway from '../../models/IGateway';
import FirestoreService from '../../services/FirestoreService';
import Row from './GatewayTableRow';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Grid } from '@mui/material';
import GatewayDialog from './GatewayDialog';

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
    const navigate = useNavigate();
    const gateways = useSelector((state: any) => state.gateways);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState<IGateway[]>([])
    const [openGatewayDialog, setOpenGatewayDialog] = React.useState(false);

    React.useEffect(() => {
        void (async (): Promise<void> => {
            setRows(await FirestoreService.getAll());
        })()
    }, []);

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
            <GatewayDialog open={openGatewayDialog} setOpen={setOpenGatewayDialog} />
            <Grid item alignSelf="end">
                <button
                    onClick={handleAddNewGateway}
                >
                    Add New Gatewway
                </button>
            </Grid>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
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
                            {gateways
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: IGateway) => {
                                    return (
                                        <Row key={row.name} row={row} onClickItem={(e) => handleOnClickItem(e, row)} />
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
