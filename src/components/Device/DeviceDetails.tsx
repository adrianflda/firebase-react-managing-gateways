import {
    Grid,
    FormControl,
    Paper,
    Divider,
    Button,
    TextField,
    FormControlLabel,
    Switch
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import IGateway from "../../models/IGateway";
import DeviceDialog from "./DeviceDialog";
import { getGatewayStateSelector } from "../../store/selectors/GatewaySelectors";
import Title from "../MainLayout/Title";
import IDevice from "../../models/IDevice";
import DeviceStatusEnum from "../../enums/DeviceStatusEnum";

const DeviceDetails = () => {
    const dispatch = useDispatch();
    const { uuid } = useParams();
    const { elements, loading } = useSelector(getGatewayStateSelector);
    const [gateway, setGateway] = useState<IGateway | null>(null);
    const [device, setDevice] = useState<IDevice | null>(null);
    const [localState, setLocalState] = useState<{ edit: boolean }>({ edit: false });
    const [formValues, setFormValues] = useState<IDevice>({ vendor: "", uuid: -1, status: DeviceStatusEnum.offline, createdAt: new Date() });
    const [openDeviceDialog, setOpenDeviceDialog] = React.useState(false);

    useEffect(() => {
        elements.forEach((gateway: IGateway) => {
            const deviceFound = (gateway.devices || []).find((device: IDevice) => `${device.uuid}` === uuid);
            if (deviceFound) {
                setDevice(deviceFound);
                setFormValues(deviceFound);
                setGateway(gateway);
            }
        });
        if (!device) {
            // TODO request device by uuid
        }
    }, [dispatch, elements, uuid]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleChangeStatus = (e: any) => {
        e.preventDefault();
        if (device) {
            device.status = device?.status === DeviceStatusEnum.online ? DeviceStatusEnum.offline : DeviceStatusEnum.online;
            setDevice(device);
            setFormValues(device);
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // FirestoreService.isValidateGateway(formValues);
        setLocalState({ edit: false });
        // dispatch(updateGateway(formValues));
    };

    const handleCancel = (event: any) => {
        event.preventDefault();
        setLocalState({ edit: false });
    }

    const handleEdit = (event: any) => {
        event.preventDefault();
        setLocalState({ edit: !localState.edit });
    }

    const handleRemove = (event: any) => {
        event.preventDefault();
        if (device) {
            // dispatch(removeDevice(gateway?.serial));
        }
    }

    if (!device) {
        return <Fragment>
            loading...
        </Fragment>
    }

    if (loading) {
        return <Fragment>
            loading...
        </Fragment>
    }

    return (
        <Fragment>
            <DeviceDialog open={openDeviceDialog} setOpen={setOpenDeviceDialog} gateway={gateway} />
            <form onSubmit={handleSubmit}>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: '80%',
                        flexGrow: 1
                    }}
                >
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item alignSelf="center">
                            <Title>Device details</Title>
                        </Grid>
                        <Grid item alignSelf="end">
                            {
                                localState.edit ?
                                    <>
                                        <Button onClick={handleRemove} color={'error'}>
                                            Delete
                                        </Button>
                                        <Button onClick={handleCancel} color="warning">
                                            Cancel
                                        </Button>

                                    </> :
                                    <Button onClick={handleEdit}>
                                        Edit
                                    </Button>
                            }
                        </Grid>
                        <Grid item container spacing={2} alignSelf="center">
                            <Grid item alignContent="space-around">
                                <FormControl variant="outlined">
                                    <TextField
                                        id="uuid-input"
                                        name="uuid"
                                        label="UUID"
                                        type="text"
                                        required
                                        disabled
                                        error={!formValues.uuid}
                                        helperText="UUID is required."
                                        value={formValues.uuid}
                                        onChange={handleInputChange}
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
                                        disabled={!localState.edit}
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item alignContent="space-around">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formValues.status === DeviceStatusEnum.online}
                                            onChange={handleChangeStatus}
                                        />
                                    }
                                    label={formValues.status}
                                />
                            </Grid>
                        </Grid>
                        {
                            localState.edit &&
                            <Grid item alignSelf="end">
                                <Button type="submit" color="success">
                                    Save
                                </Button>
                            </Grid>
                        }
                        <Divider hidden />
                    </Grid>
                </Paper>
            </form>
        </Fragment>
    );
};

export default DeviceDetails;
