import * as React from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, Grid, ButtonBase, FormControl, InputLabel, Input, styled } from '@mui/material';
import { addGateway } from '../../actions';
import FirestoreService from '../../services/FirestoreService';
import IGateway from '../../models/IGateway';
import { IMaskInput } from 'react-imask';

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

export default function GatewayDialog({ open, setOpen }: any) {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = React.useState<IGateway>({ name: "", serial: "", address: "", devices: [], deleted: false });

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const submit = (event: any) => {
        event.preventDefault();
        FirestoreService.isValidateGateway(formValues);
        console.log(formValues);
        dispatch(addGateway(formValues));
        setOpen(false);
    };

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
                                                    type="text"
                                                    name='name'
                                                    value={formValues.name}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="serial">Serial</InputLabel>
                                                <Input
                                                    id="serial-input"
                                                    type="text"
                                                    name='serial'
                                                    required
                                                    value={formValues.serial}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="address">Address</InputLabel>
                                                <IMaskInput
                                                    id="address-input"
                                                    type="text"
                                                    name='address'
                                                    mask="###.###.###.###"
                                                    definitions={{
                                                        '#': /[0-9]/,
                                                    }}
                                                    onAccept={(value: any) => handleInputChange({ target: { name: 'address', value } })}
                                                    overwrite
                                                    value={formValues.address}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={submit}>Add</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
