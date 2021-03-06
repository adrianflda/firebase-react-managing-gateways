import React, { } from 'react';
import { useDispatch } from 'react-redux';
import IDevice from '../../models/IDevice';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { updateGateway } from '../../store/actions/GatewayActions';
import DeviceTableRow from './DevicesByGatwayTableRow';
import IGateway from '../../models/IGateway';
import DeviceStatusEnum from '../../enums/DeviceStatusEnum';
import Title from '../MainLayout/Title';

interface Column {
    id: 'createdAt' | 'uuid' | 'vendor' | 'status' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'uuid',
        label: 'Identifier',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'vendor',
        label: 'Vendor',
        minWidth: 100,
        align: 'center'
    },
    {
        id: 'createdAt',
        label: 'Date',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'actions',
        label: 'Action',
        minWidth: 170,
        align: 'center'
    }
];

export interface IDeviceTableProps {
    gateway: IGateway
    editMode: boolean
}

export default function DeviceTable({ gateway, editMode = true }: IDeviceTableProps) {
    const dispatch = useDispatch();

    const handleRemoveDevice = (deviceToRemove: IDevice) => {
        gateway.devices = gateway.devices.filter((device: IDevice) => device.uuid !== deviceToRemove.uuid);
        dispatch(updateGateway(gateway));
    }

    const handleChangeStatus = (deviceToChangeStatus: IDevice) => {
        const deviceIndex = (gateway.devices || []).findIndex((device: IDevice) => device.uuid === deviceToChangeStatus.uuid);
        deviceToChangeStatus.status = deviceToChangeStatus.status === DeviceStatusEnum.online ? DeviceStatusEnum.offline : DeviceStatusEnum.online;
        gateway.devices.splice(deviceIndex, 1, deviceToChangeStatus);
        dispatch(updateGateway(gateway));
    };

    return (
        <Grid item xs container direction="column" spacing={2}>
            <Grid item alignSelf="center">
                <Title>Devices:</Title>
            </Grid>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(gateway.devices || []).map((device: IDevice) => {
                            return (
                                <DeviceTableRow
                                    key={device.uuid}
                                    device={device}
                                    editMode={editMode}
                                    removeDevice={handleRemoveDevice}
                                    changeStatus={handleChangeStatus}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
