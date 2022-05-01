import { connect } from 'react-redux';
import styled from 'styled-components';

import GatewayItem from './GatewayItem';
import IGateway from '../../models/IGateway';

// Filter gateways based on selected filter
const filteredGateway = (gateways: IGateway[], filter: any) => {
    return gateways;
}

// Get gateways from state
const mapStateToProps = (state: any) => {
    return {
        gateways: filteredGateway(state.gateways, state.filter),
        filter: state.filter
    }
}

const List = styled.ul`
    padding-left: 0
`;

// Component to display gatewaylist, also wraps Filter component
const GatewayList = ({ gateways, filter }: any) => {
    // Display message if no gateways
    let message;
    if (gateways.length === 0) {
        const text = 'Chill scenes.';
        message = (<div className="row flex-center margin-top-large">{text}</div>);
    }

    const onItemClick = (serial: string) => {
        // TODO router.push(/gateway/:gatewaySerial)
        console.log('gateway details', serial);
    }

    return (
        <div>
            {message ? message :
                <List className="child-borders">
                    {gateways.map((gateway: IGateway) =>
                        <GatewayItem
                            className="row"
                            key={gateway.serial}
                            onItemClick={onItemClick}
                            {...gateway}
                        />
                    )}
                </List>
            }
        </div>
    );
}

export default connect(mapStateToProps)(GatewayList);