import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import DnsIcon from '@mui/icons-material/Dns';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const GatewayItem = ({ serial, name, deleted, address, devices, onItemRemove, onItemClick }: any) => {
    return (
        <ListItem
            className={"padding-small margin-small " + (deleted ? 'background-primary' : 'shadow shadow-hover')}
            style={deleted ? { textDecoration: 'line-through' } : {}}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={e => onItemRemove(e, serial)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar onClick={(e) => onItemClick(e, serial)}>
                <Avatar>
                    <DnsIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                onClick={(e) => onItemClick(e, serial)}
                primary={name}
                secondary={serial}
            />
            <ListItemText
                onClick={(e) => onItemClick(e, serial)}
                primary={address}
                secondary={`Devices: ${[...devices].length}`}
            />
        </ListItem>
    )
}

export default GatewayItem;