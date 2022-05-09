import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, Grid, FormControl, styled, Button, TextField } from '@mui/material';
import { addGateway } from '../../actions';
import FirestoreService from '../../services/FirestoreService';
import IGateway from '../../models/IGateway';

interface IGatewayDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function GatewayDialog({ open, setOpen }: IGatewayDialogProps) {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState<IGateway>({ name: "", serial: "", address: "", devices: [], deleted: false });
    const [formErrors, setFormErrors] = useState<any>({ name: "", serial: "", address: "" });

    useEffect(() => {
        if (formValues) {
            validateGatewayData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const submit = (event: any) => {
        event.preventDefault();
        FirestoreService.isValidateGateway(formValues);
        setOpen(false);
        dispatch(addGateway(formValues));
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

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Gateway</DialogTitle>
                <DialogContent>
                    <form onSubmit={submit}>
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 800,
                            }}
                        >
                            <Grid container direction="column" spacing={2} alignSelf="center">
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
                                            variant="outlined"
                                        />
                                    </FormControl>
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
