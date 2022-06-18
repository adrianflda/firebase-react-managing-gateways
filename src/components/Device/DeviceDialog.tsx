import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, Grid, FormControl, Button, TextField, FormControlLabel, Switch, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import IGateway from '../../models/IGateway';
import IDevice from '../../models/IDevice';
import { updateGateway } from '../../store/actions/GatewayActions';
import DeviceStatusEnum from '../../enums/DeviceStatusEnum';
import { getGatewayStateSelector } from '../../store/selectors/GatewaySelectors';

interface IDeviceDialogProps {
    gateway?: IGateway | null,
    open: boolean,
    setOpen: (open: boolean) => void
}
export default function DeviceDialog({ gateway = null, open, setOpen }: IDeviceDialogProps) {
    const dispatch = useDispatch();
    const { elements } = useSelector(getGatewayStateSelector);
    const [localGateway, setLocalGateway] = useState<IGateway | null>(gateway);
    const [localGatewaySerial, setLocalGatewaySerial] = React.useState('');
    const [formValues, setFormValues] = useState<IDevice>({ uuid: new Date().getTime(), vendor: "", createdAt: new Date(), status: DeviceStatusEnum.offline });

    useEffect(() => {
        if (localGatewaySerial) {
            const element = elements.find((e) => e.serial === localGatewaySerial);
            if (element) {
                setLocalGateway(element);
            }
        }
    }, [elements, localGatewaySerial]);

    const getDate = (): string => {
        return DateTime.fromJSDate(formValues.createdAt).toFormat('yyyy-MM-dd');
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: any) => {
        let { name, value, checked } = e.target;
        if (name === 'status') {
            value = checked ? DeviceStatusEnum.online : DeviceStatusEnum.offline;
        }
        if (name === 'createdAt') {
            value = DateTime.fromFormat(value, 'yyyy-MM-dd').toJSDate();
        }
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleGatewaySelection = (event: SelectChangeEvent) => {
        setLocalGatewaySerial(event.target.value as string);
    }

    const submit = (event: any) => {
        event.preventDefault();
        if (!localGateway) {
            return;
        }
        localGateway.devices = [...localGateway.devices, formValues]
        setOpen(false);
        dispatch(updateGateway(localGateway));
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogContent>
                    <form onSubmit={submit}>
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 800,
                            }}
                        >
                            <Grid container direction="column" spacing={2} alignSelf="center" alignItems="center">
                                <Grid item alignContent="space-around">
                                    <FormControl fullWidth>
                                        <InputLabel id="select-gateway-label">Gateway</InputLabel>
                                        <Select
                                            labelId="select-gateway-label"
                                            id="select-gateway"
                                            value={localGatewaySerial}
                                            label="Gateway"
                                            onChange={handleGatewaySelection}
                                        >
                                            {
                                                elements.map((element: IGateway) =>
                                                    <MenuItem
                                                        key={element.serial}
                                                        value={element.serial}
                                                    >
                                                        {element.name}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item alignContent="space-around">
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="uuid-input"
                                            name="uuid"
                                            label="UUID"
                                            type="text"
                                            disabled
                                            value={formValues.uuid}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item alignContent="space-around">
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="vendor-input"
                                            name="vendor"
                                            label="Vendor"
                                            type="text"
                                            value={formValues.vendor}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item alignContent="space-around">
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="date-input"
                                            name="createdAt"
                                            label="Created At"
                                            type="date"
                                            defaultValue={getDate()}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item alignContent="space-around">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="status"
                                                checked={formValues.status === DeviceStatusEnum.online}
                                                onChange={handleInputChange}
                                            />
                                        }
                                        label={formValues.status}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={submit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
