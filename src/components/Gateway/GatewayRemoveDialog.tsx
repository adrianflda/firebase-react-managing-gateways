import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IGatewayDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    handleClose: () => void,
    handleOk: () => void
}

export default function GatewayRemoveDialog({ open, setOpen, handleClose, handleOk }: IGatewayDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Attention!!!
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to remove this gateway?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleOk} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
