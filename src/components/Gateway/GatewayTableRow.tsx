
import { useState, Fragment } from "react";
import { useDispatch } from 'react-redux';
import {
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
    Table,
    TableHead,
    TableBody,
    Switch,
    FormControlLabel,
    styled,
    tableCellClasses
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';

import IGateway from "../../models/IGateway";
import { removeGateway, updateGateway } from "../../store/actions/GatewayActions";
import { DeleteSweep } from "@mui/icons-material";
import IDevice from "../../models/IDevice";
import DeviceStatusEnum from "../../enums/DeviceStatusEnum";
import GatewayRemoveDialog from './GatewayRemoveDialog';
import Title from "../MainLayout/Title";
import Image from "../Image/Image";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const GatewayTableRow = (props: { row: IGateway, onClickItem: (e: any, item: any) => void }) => {
    const { row } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openGatewayDialog, setOpenGatewayDialog] = useState(false);

    const onItemRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpenGatewayDialog(true);
    }

    const handleRemoveOk = () => {
        dispatch(removeGateway(row.serial));
        setOpenGatewayDialog(false);
    }

    const handleRemoveCancel = () => {
        setOpenGatewayDialog(false);
    }


    const handleChangeStatus = (e: any) => {
        const { name: uuid, checked } = e.target;
        const deviceIndex = (row.devices || []).findIndex((device: IDevice) => `${device.uuid}` === uuid);
        if (deviceIndex > -1) {
            const newDevice: IDevice = { ...row.devices[deviceIndex], status: checked ? DeviceStatusEnum.online : DeviceStatusEnum.offline };
            row.devices.splice(deviceIndex, 1, newDevice);
            dispatch(updateGateway(row));
        }
    };

    return (
        <Fragment>
            <GatewayRemoveDialog open={openGatewayDialog} setOpen={setOpenGatewayDialog} handleOk={handleRemoveOk} handleClose={handleRemoveCancel} />
            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    onClick={(e) => props.onClickItem(e, row.serial)}
                >
                    <Image
                        imageRoute={`gatewayImages/${row.serial}/`}
                        imageName={row.name}
                        editable={false}
                        size={30}
                    />
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    onClick={(e) => props.onClickItem(e, row.serial)}
                >
                    {row.name}
                </TableCell>
                <TableCell
                    align="center"
                    onClick={(e) => props.onClickItem(e, row.serial)}
                >
                    {row.serial}
                </TableCell>
                <TableCell
                    align="center"
                    onClick={(e) => props.onClickItem(e, row.serial)}
                >
                    {row.address}
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        color={row.deleted ? 'success' : 'error'}
                        onClick={onItemRemove}
                    >
                        {row.deleted ? <DeleteSweep /> : <DeleteIcon />}
                    </IconButton>
                </TableCell>
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Title>
                                Devices
                            </Title>
                            <Table size="small" aria-label="Devices">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">UUID</StyledTableCell>
                                        <StyledTableCell align="center">Vendor</StyledTableCell>
                                        <StyledTableCell align="center">Created At</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(row.devices || []).map((device: IDevice, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{device.uuid}</TableCell>
                                            <TableCell align="center">{device.vendor}</TableCell>
                                            <TableCell align="center">{device.createdAt ? new Date(device.createdAt).toLocaleDateString() : 'no date'}</TableCell>
                                            <TableCell align="center">
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name={`${device.uuid}`}
                                                            checked={device.status === DeviceStatusEnum.online}
                                                            onChange={handleChangeStatus}
                                                        />
                                                    }
                                                    label={device.status}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default GatewayTableRow;