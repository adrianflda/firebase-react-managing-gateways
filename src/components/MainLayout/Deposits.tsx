import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useSelector } from 'react-redux';
import { getGatewayStateSelector } from '../../store/selectors/GatewaySelectors';
import DeviceStatusEnum from '../../enums/DeviceStatusEnum';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  const { elements } = useSelector(getGatewayStateSelector);
  const [totalOnlineDevices, setTotalOnlineDevices] = React.useState<number>(0);

  React.useEffect(() => {
    let count = 0;
    elements.forEach((gateway) => {
      let onlineDevices = gateway.devices.filter((device) => device.status === DeviceStatusEnum.online).length;
      count += onlineDevices;
    })
    setTotalOnlineDevices(count);
  }, [elements]);

  return (
    <React.Fragment>
      <Title>Total Gateways</Title>
      <Typography component="p" variant="h4">
        {elements.length}
      </Typography>
      <Title>Total Devices Online</Title>
      <Typography component="p" variant="h4">
        {totalOnlineDevices}
      </Typography>
    </React.Fragment>
  );
}
