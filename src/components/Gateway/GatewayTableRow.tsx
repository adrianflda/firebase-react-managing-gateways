
import { useState, Fragment } from "react";
import { useDispatch } from 'react-redux';
import {
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    Switch,
    FormControlLabel
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';

import IGateway from "../../models/IGateway";
import { toggleGatewayDelete, updateGateway } from "../../actions";
import { DeleteSweep } from "@mui/icons-material";
import IDevice from "../../models/IDevice";
import DeviceStatusEnum from "../../enums/DeviceStatusEnum";

const GatewayTableRow = (props: { row: IGateway, onClickItem: (e: any, item: any) => void }) => {
    const { row } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onItemRemove = (e: React.MouseEvent<HTMLElement>, serial: string) => {
        e.preventDefault();
        dispatch(toggleGatewayDelete(serial));
    }

    const handleChangeStatus = (e: any) => {
        const { name: uuid, checked } = e.target;
        const deviceIndex = (row.devices || []).findIndex((device: IDevice) => `${device.uuid}` === uuid);
        if (deviceIndex > -1) {
            const newDevice: IDevice = { ...row.devices[deviceIndex], status: checked ? DeviceStatusEnum.online : DeviceStatusEnum.offline };
            row.devices.splice(deviceIndex, 1, newDevice);
            dispatch(updateGateway(row));
        }
    };

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    onClick={(e) => props.onClickItem(e, row.serial)}
                >
                    {row.name}
                </TableCell>
                <TableCell
                    align="center"
                    onClick={(e) => props.onClickItem(e, row.serial)}
                >
                    {row.serial}
                </TableCell>
                <TableCell
                    align="center"
                    onClick={(e) => props.onClickItem(e, row.serial)}
                >
                    {row.address}
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        color={row.deleted ? 'success' : 'error'}
                        onClick={e => onItemRemove(e, row.serial)}
                    >
                        {row.deleted ? <DeleteSweep /> : <DeleteIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Devices
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">UUID</TableCell>
                                        <TableCell align="center">Vendor</TableCell>
                                        <TableCell align="center">Created At</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(row.devices || []).map((device: IDevice, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{device.uuid}</TableCell>
                                            <TableCell align="center">{device.vendor}</TableCell>
                                            <TableCell align="center">{device.createdAt ? new Date(device.createdAt).toLocaleDateString() : 'no date'}</TableCell>
                                            <TableCell align="center">
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name={`${device.uuid}`}
                                                            checked={device.status === DeviceStatusEnum.online}
                                                            onChange={handleChangeStatus}
                                                        />
                                                    }
                                                    label={device.status}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default GatewayTableRow;