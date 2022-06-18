import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IGateway from '../../models/IGateway';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ROUTES } from '../../constants/routes';
import { removeGateway } from '../../store/actions/GatewayActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GatewayRemoveDialog from './GatewayRemoveDialog';
import { FormControlLabel, List, ListItem, ListItemText, Switch } from '@mui/material';
import IDevice from '../../models/IDevice';
import Image from '../Image/Image';
import DeviceStatusEnum from '../../enums/DeviceStatusEnum';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),

}));

export default function GatewayCard({ gateway }: { gateway: IGateway }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [openGatewayDialog, setOpenGatewayDialog] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpenGatewayDialog(true);
    }

    const handleRemoveOk = () => {
        dispatch(removeGateway(gateway.serial));
        setOpenGatewayDialog(false);
    }

    const handleRemoveCancel = () => {
        setOpenGatewayDialog(false);
    }

    const handleViewDetails = (e: any) => {
        e.preventDefault();
        if (typeof ROUTES.GATEWAYS_DETAILS.dynamicRoute === 'function') {
            const gatewayDetailsRoute = ROUTES.GATEWAYS_DETAILS.dynamicRoute(gateway.serial);
            navigate(gatewayDetailsRoute);
        }
    }

    return (
        <>
            <GatewayRemoveDialog open={openGatewayDialog} setOpen={setOpenGatewayDialog} handleOk={handleRemoveOk} handleClose={handleRemoveCancel} />
            <Card sx={{ maxWidth: 355 }}>
                <CardHeader
                    avatar={
                        <Image
                            imageRoute={`gatewayImages/${gateway.serial}/`}
                            imageName={gateway.name}
                            editable={false}
                        />
                    }
                    title={gateway.name}
                    subheader={`Serial: ${gateway.serial}`}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Address: {gateway.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Devices: {gateway.devices.length}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="delete gateway"
                        onClick={handleRemove}
                    >
                        <DeleteForeverOutlinedIcon color='error' />
                    </IconButton>
                    <IconButton
                        aria-label="view details"
                        onClick={handleViewDetails}
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Devices:</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {gateway.devices.map((device: IDevice) => (
                                <ListItem key={device.uuid}>
                                    <ListItemText
                                        primary={device.uuid}
                                        secondary={
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={device.status === DeviceStatusEnum.online}
                                                    />
                                                }
                                                label={device.status}
                                            />
                                        } />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        </>);
}
