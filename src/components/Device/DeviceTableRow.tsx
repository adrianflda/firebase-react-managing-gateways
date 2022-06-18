import { TableCell, styled, TableRow } from "@mui/material";
import IDevice from "../../models/IDevice";
import IGateway from "../../models/IGateway";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const DeviceTableRow = ({ gateway, device, onClickItem }: { gateway: IGateway, device: IDevice, onClickItem: (e: any, item: any) => void }) => {
    return <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell
            align="center"
            onClick={(e) => onClickItem(e, device.uuid)}
        >
            {gateway.name}
        </TableCell>
        <TableCell
            align="center"
            onClick={(e) => onClickItem(e, device.uuid)}
        >
            {new Date(device.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell
            align="center"
            onClick={(e) => onClickItem(e, device.uuid)}
        >
            {device.uuid}
        </TableCell>
        <TableCell
            align="center"
            onClick={(e) => onClickItem(e, device.uuid)}
        >
            {device.vendor}
        </TableCell>
        <TableCell
            align="center"
            onClick={(e) => onClickItem(e, device.uuid)}
        >
            {device.status}
        </TableCell>
    </StyledTableRow>
}

export default DeviceTableRow;