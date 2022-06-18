
import { Box, Grid, TablePagination } from "@mui/material";
import { useState } from "react";
import IDevice from "../../models/IDevice";
import IGateway from "../../models/IGateway";
import Title from "../MainLayout/Title";
import DeviceCard from "./DeviceCard";

const DeviceList = ({ gateways }: { gateways: IGateway[] }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <Title>Devices</Title>
        <Grid container spacing={4}>
            {gateways
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((gateway: IGateway) => {
                    return gateway.devices.map((device: IDevice) => {
                        return (
                            <Grid item key={device.uuid} xs={12} sm={6} md={4}>
                                <DeviceCard key={device.uuid} gateway={gateway} device={device} />
                            </Grid>
                        );
                    })
                })}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={gateways.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
    </Box>
}

export default DeviceList;