import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    styled,
    TableCell,
    tableCellClasses
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import IDevice from "../../models/IDevice";
import IGateway from "../../models/IGateway";
import DeviceTableRow from "../Device/DeviceTableRow";
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

const DeviceTable = ({ gateways }: { gateways: IGateway[] }) => {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOnClickItem = (e: any, row: IDevice) => {
        e.preventDefault();
        if (!row) {
            return;
        }
        if (typeof ROUTES.DEVICES_DETAILS.dynamicRoute === 'function') {
            const deviceDetailsRoute = ROUTES.DEVICES_DETAILS.dynamicRoute(`${row.uuid}`);
            navigate(deviceDetailsRoute);
        }
    }

    return <>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Devices</Title>

            <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Gateway</StyledTableCell>
                        <StyledTableCell align="center">Created At</StyledTableCell>
                        <StyledTableCell align="center">UUID</StyledTableCell>
                        <StyledTableCell align="center">Vendor</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gateways
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((gateway: IGateway) => {
                            return gateway.devices.map((device: IDevice) => {
                                return (
                                    <DeviceTableRow key={device.uuid} gateway={gateway} device={device} onClickItem={(e: any) => handleOnClickItem(e, device)} />
                                );
                            })
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
    </>
}

export default DeviceTable;