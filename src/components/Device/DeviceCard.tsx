import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import IDevice from '../../models/IDevice';
import IGateway from '../../models/IGateway';
import DeviceRemoveDialog from './DeviceRemoveDialog';
import DeviceStatusEnum from '../../enums/DeviceStatusEnum';

export default function DeviceCard({ gateway, device }: { gateway: IGateway, device: IDevice }) {
    const dispatch = useDispatch();
    const [openDeviceDialog, setOpenDeviceDialog] = useState(false);

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpenDeviceDialog(true);
    }

    const handleRemoveOk = () => {
        // dispatch(removeDevice(gateway.serial));
        setOpenDeviceDialog(false);
    }

    const handleRemoveCancel = () => {
        setOpenDeviceDialog(false);
    }

    return (
        <>
            <DeviceRemoveDialog open={openDeviceDialog} setOpen={setOpenDeviceDialog} handleOk={handleRemoveOk} handleClose={handleRemoveCancel} />
            <Card sx={{ maxWidth: 355 }}>
                <CardHeader
                    title={device.uuid}
                    subheader={device.vendor}
                />
                <CardContent>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={device.status === DeviceStatusEnum.online}
                            />
                        }
                        label={device.status}
                    />
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Gateway: {gateway.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Gateway Serial: {gateway.serial}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="delete gateway"
                        onClick={handleRemove}
                    >
                        <DeleteForeverOutlinedIcon color='error' />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}
