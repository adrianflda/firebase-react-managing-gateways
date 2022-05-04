
import { useState, Fragment } from "react";
import { useDispatch } from 'react-redux';
import {
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
    Typography,
    Table,
    TableHead,
    TableBody
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';

import IGateway from "../../models/IGateway";
import { toggleGatewayDelete } from "../../actions";
import { DeleteSweep } from "@mui/icons-material";

const Row = (props: { row: IGateway, onClickItem: (e: any, item: any) => void }) => {
    const { row } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onItemRemove = (e: React.MouseEvent<HTMLElement>, serial: string) => {
        e.preventDefault();
        dispatch(toggleGatewayDelete(serial));
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                        onClick={e => onItemRemove(e, row.serial)}
                    >
                        {row.deleted ? <DeleteSweep /> : <DeleteIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(row.devices || []).map((historyRow: any) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
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

export default Row;