import { combineReducers } from 'redux';
import gateways from './GatewayReducers';
import user from './UserReducers';

const rootReducer = combineReducers({
    gateways,
    user
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer; 