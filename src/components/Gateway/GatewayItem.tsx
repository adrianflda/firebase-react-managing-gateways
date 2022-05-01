import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import DnsIcon from '@mui/icons-material/Dns';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { toggleGatewayDelete } from '../../actions';

// Toggle gateway completed state
const mapDispatchToProps = (dispatch: any) => {
    return {
        onItemRemove: (serial: string) => dispatch(toggleGatewayDelete(serial))
    }
}

// Individual Gateway component, depending on state of completion, styles are applied
const GatewayItem = ({ serial, name, deleted, address, devices, onItemRemove, onItemClick }: any) => {
    return (
        <ListItem
            onClick={() => onItemClick(serial)}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={e => onItemRemove(serial)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <DnsIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                className={"padding-small margin-small " + (deleted ? 'background-primary' : 'shadow shadow-hover')}
                style={deleted ? { textDecoration: 'line-through' } : {}}
                primary={name}
                secondary={serial}
            />
            <ListItemText
                primary={address}
                secondary={`Devices: ${[...devices].length}`}
            />
        </ListItem>
    )
}



export default connect(null, mapDispatchToProps)(GatewayItem);