import { ADD_GATEWAY, CLEAR_GATEWAYS, TOGGLE_GATEWAY_DELETE } from '../constants/action-types';

export const addGateway = (payload: any) => ({
    type: ADD_GATEWAY,
    payload
});

export const clearGateways = () => ({
    type: CLEAR_GATEWAYS
});

export const toggleGatewayDelete = (serial: any) => ({
    type: TOGGLE_GATEWAY_DELETE,
    serial
});