import {
    Grid,
    Input,
    FormControl,
    InputLabel,
    ButtonBase,
    Paper,
    styled
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IMaskInput } from 'react-imask';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IGateway from "../../models/IGateway";
import FirestoreService from "../../services/FirestoreService";
import { toggleGatewayDelete, updateGateway } from "../../actions";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const GatewayDetails = () => {
    const dispatch = useDispatch();
    const { serial } = useParams();
    const gateway = useSelector((state: any) => state.gateways.find((gateway: IGateway) => gateway.serial === serial));
    const [localState, setLocalState] = useState<{ edit: boolean }>({ edit: false });
    const [formValues, setFormValues] = useState<IGateway>({ name: "", serial: "", address: "", devices: [], deleted: false });
    useEffect(() => {
        if (gateway) {
            setFormValues({ ...gateway });
        }
    }, [gateway]);
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
        dispatch(updateGateway(formValues));
        setLocalState({ edit: false });
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
    const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
        function TextMaskCustom(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask="###.###.###.###"
                    definitions={{
                        '#': /[0-9]/,
                    }}
                    onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                    overwrite
                />
            );
        },
    );
    return (
        <form onSubmit={handleSubmit}>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 800,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img alt="complex" src="/static/images/grid/complex.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input
                                        id="name-input"
                                        name="name"
                                        type="text"
                                        disabled={!localState.edit}
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="serial">Serial</InputLabel>
                                    <Input
                                        id="serial-input"
                                        name="serial"
                                        type="text"
                                        required
                                        disabled={!localState.edit}
                                        value={formValues.serial}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="address">Address</InputLabel>
                                    <Input
                                        id="address-input"
                                        name="address"
                                        type="text"
                                        disabled={!localState.edit}
                                        inputComponent={TextMaskCustom as any}
                                        value={formValues.address}
                                    />
                                </FormControl>
                            </Grid>
                            {
                                localState.edit &&
                                <Grid item>
                                    <button type="submit">
                                        Save
                                    </button>
                                    <button onClick={(e) => handleCancel(e)}>
                                        Cancel
                                    </button>
                                </Grid>
                            }
                        </Grid>
                        <Grid item>
                            {
                                localState.edit ?
                                    <button onClick={handleRemove}>
                                        {gateway?.deleted ? "Restore" : "Delete"}
                                    </button> :
                                    <button onClick={handleEdit}>
                                        Edit
                                    </button>
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
};

export default GatewayDetails;
