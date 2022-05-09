import {
    TableRow,
    TableCell,
    Switch,
    FormControlLabel,
    IconButton
} from "@mui/material";

import IDevice from "../../models/IDevice";
import DeviceStatusEnum from "../../enums/DeviceStatusEnum";
import DeleteIcon from '@mui/icons-material/Delete';

export interface IDevicesByGatewayProps {
    device: IDevice,
    editMode: boolean,
    removeDevice?: (item: any) => void,
    changeStatus?: (item: any) => void
}

const DevicesByGatewayTableRow = ({ device, editMode, removeDevice, changeStatus }: IDevicesByGatewayProps) => {

    const handleRemoveDevice = (e: any) => {
        e.preventDefault();
        if (typeof changeStatus === 'function') {
            changeStatus(device);
        }
    }

    const handleChangeStatus = (e: any) => {
        e.preventDefault();
        if (typeof changeStatus === 'function') {
            changeStatus(device);
        }
    }

    return (
        <TableRow key={device.uuid}>
            <TableCell align="center">
                <FormControlLabel
                    control={
                        <Switch
                            checked={device.status === DeviceStatusEnum.online}
                            onChange={handleChangeStatus}
                        />
                    }
                    label={device.status}
                />
            </TableCell>
            <TableCell align="center">{device.uuid}</TableCell>
            <TableCell align="center">{device.vendor}</TableCell>
            <TableCell align="center">{device.createdAt ? new Date(device.createdAt).toLocaleDateString() : 'no date'}</TableCell>
            <TableCell align="center">
                <IconButton
                    disabled={editMode === false}
                    edge="end"
                    aria-label="delete"
                    color="error"
                    onClick={handleRemoveDevice}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default DevicesByGatewayTableRow;