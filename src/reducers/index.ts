import { combineReducers } from 'redux';
import gateways from './GatewayReducers';
import user from './UserReducers';

export default combineReducers({
    gateways,
    user
});