import {
    Grid,
    FormControl,
    Paper,
    Fab,
    Zoom,
    useTheme,
    SxProps,
    Divider,
    Button,
    TextField
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IGateway from "../../models/IGateway";
import FirestoreService from "../../services/FirestoreService";
import { toggleGatewayDelete, updateGateway } from "../../actions/GatewayActions";
import DeviceStatusEnum from "../../enums/DeviceStatusEnum";
import IDevice from "../../models/IDevice";
import DevicesByGateway from "../Device/DevicesByGatwayTable";
import AddIcon from '@mui/icons-material/Add';
import { FAV_STYLE } from '../../constants/globals'
import DeviceDialog from "../Device/DeviceDialog";

const GatewayDetails = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { serial } = useParams();
    const gateway = useSelector((state: any) => state.gateways.find((gateway: IGateway) => gateway.serial === serial));
    const [localState, setLocalState] = useState<{ edit: boolean }>({ edit: false });
    const [formValues, setFormValues] = useState<IGateway>({ name: "", serial: "", address: "", devices: [], deleted: false });
    const [formErrors, setFormErrors] = useState<any>({ name: "", serial: "", address: "" });
    const [openDeviceDialog, setOpenDeviceDialog] = React.useState(false);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    useEffect(() => {
        if (gateway) {
            setFormValues({ ...gateway });
        }
    }, [gateway]);

    useEffect(() => {
        if (formValues && localState.edit) {
            validateGatewayData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        FirestoreService.isValidateGateway(formValues);
        setLocalState({ edit: false });
        dispatch(updateGateway(formValues));
    };

    const handleCancel = (event: any) => {
        event.preventDefault();
        setFormValues({ ...gateway });
        setLocalState({ edit: false });
    }

    const handleEdit = (event: any) => {
        event.preventDefault();
        setLocalState({ edit: !localState.edit });
    }

    const handleRemove = (event: any) => {
        event.preventDefault();
        if (gateway) {
            dispatch(toggleGatewayDelete(gateway.serial));
        }
    }

    const handleChangeStatus = (e: any) => {
        const { name: uuid, checked } = e.target;
        const deviceIndex = (gateway.devices || []).findIndex((device: IDevice) => `${device.uuid}` === uuid);
        if (deviceIndex > -1) {
            const newDevice: IDevice = { ...gateway.devices[deviceIndex], status: checked ? DeviceStatusEnum.online : DeviceStatusEnum.offline };
            gateway.devices.splice(deviceIndex, 1, newDevice);
            dispatch(updateGateway(gateway));
        }
    };

    const validateGatewayData = () => {
        try {
            FirestoreService.isValidateGateway(formValues);
            setFormErrors({ errors: null });
            return true;
        } catch (error: any) {
            const { address } = JSON.parse(error.message);
            setFormErrors({ ...formErrors, address });
            return false;
        }
    }

    const handleAddNewDevice = (event: any) => {
        event.preventDefault();
        setOpenDeviceDialog(!openDeviceDialog);
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
                    <Grid container spacing={2} alignSelf="center">
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item alignSelf="center">
                                    Gateway details ...
                                </Grid>
                                <Grid item alignSelf="end">
                                    {
                                        localState.edit ?
                                            <>
                                                <Button onClick={handleRemove} color={gateway?.deleted ? 'success' : 'error'}>
                                                    {gateway?.deleted ? "Restore" : "Delete"}
                                                </Button>
                                                <Button onClick={handleEdit} color="warning">
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
                                                id="serial-input"
                                                name="serial"
                                                label="Serial"
                                                type="text"
                                                required
                                                error={!formValues.serial}
                                                helperText="Serial is required."
                                                disabled={!localState.edit}
                                                value={formValues.serial}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item alignContent="space-around">
                                        <FormControl variant="outlined">
                                            <TextField
                                                id="name-input"
                                                name="name"
                                                label="Name"
                                                type="text"
                                                disabled={!localState.edit}
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item alignContent="space-around">
                                        <FormControl variant="outlined">
                                            <TextField
                                                id="address-input"
                                                type="text"
                                                name='address'
                                                label="Address"
                                                value={formValues.address}
                                                onChange={handleInputChange}
                                                error={!!formErrors.address}
                                                helperText={formErrors.address}
                                                disabled={!localState.edit}
                                                variant="outlined"
                                            />
                                        </FormControl>
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
                        </Grid>
                    </Grid>
                    <DevicesByGateway gateway={gateway} editMode={localState.edit} />
                </Paper>
                <Zoom
                    key={gateway.serial}
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
                        color="secondary"
                        onClick={handleAddNewDevice}
                    >
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </Fragment>
    );
};

export default GatewayDetails;
