import { ADD_GATEWAY, CLEAR_GATEWAYS, TOGGLE_GATEWAY_DELETE, UPDATE_GATEWAY } from '../constants/actions';
import IGateway from '../models/IGateway';
import { GATEWAYS } from '../services/FirestoreService';

// Check localStorage for saved Gateways, else return null array
const storedGateways = () => {
    const localGateways = localStorage.getItem('gateways');
    if (localGateways) {
        return JSON.parse(localGateways);
    } else {
        return GATEWAYS
    }
};

// Each action as a switch case, to perform different actions to state
const gateways = (state = storedGateways(), action: any) => {
    switch (action.type) {
        case ADD_GATEWAY:
            localStorage.setItem('gateways', JSON.stringify([...state, action.payload]));
            return [...state, action.payload];

        case UPDATE_GATEWAY:
            const updatedGateways = state.map((gateway: IGateway) => {
                if (gateway.serial === action.payload.serial)
                    return Object.assign({}, gateway, action.payload);
                return gateway;
            });
            localStorage.setItem('gateways', JSON.stringify(updatedGateways));
            return updatedGateways;

        case CLEAR_GATEWAYS:
            localStorage.removeItem('gateways');
            return [];

        case TOGGLE_GATEWAY_DELETE:
            const modifiedGateways = state.map((gateway: IGateway) => {
                if (gateway.serial === action.serial)
                    return Object.assign({}, gateway, { deleted: !gateway.deleted });
                return gateway;
            });
            localStorage.setItem('gateways', JSON.stringify(modifiedGateways));
            return modifiedGateways;

        default:
            return state;
    }
}

export default gateways;