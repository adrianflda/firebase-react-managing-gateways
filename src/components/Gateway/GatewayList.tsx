import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { } from 'react';
import IGateway from '../../models/IGateway';
import Title from '../MainLayout/Title';
import GatewayCard from './GatewayCard';

export default function GatewayList({ gateways }: { gateways: IGateway[] }) {
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <Title>List</Title>

            <Grid container spacing={4}>
                {gateways.map((gateway) => (
                    <Grid item key={gateway.serial} xs={12} sm={6} md={4}>
                        <GatewayCard gateway={gateway} />
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
}
