import {
    CLEAR_GATEWAYS,
    GET_GATEWAYS_FAILED,
    GET_GATEWAYS_REQUESTED,
    GET_GATEWAYS_SUCCESS,
    GET_GATEWAY_FAILED,
    GET_GATEWAY_REQUESTED,
    GET_GATEWAY_SUCCESS,
    REMOVE_GATEWAY_FAILED,
    REMOVE_GATEWAY_REQUESTED,
    REMOVE_GATEWAY_SUCCESS,
    UPSERT_GATEWAY_FAILED,
    UPSERT_GATEWAY_REQUESTED,
    UPSERT_GATEWAY_SUCCESS,
} from '../constants';
import IGateway from '../../models/IGateway';
import { GatewayState } from '../types';

const storedGateways = () => {
    const localGateways = localStorage.getItem('gateways');
    if (localGateways) {
        return JSON.parse(localGateways);
    } else {
        return {}
    }
};

const initialState: GatewayState = {
    loading: false,
    elements: [],
    error: null,
    ...storedGateways()
};

// Each action as a switch case, to perform different actions to state
const gateways = (state = initialState, action: any): GatewayState => {
    console.log(action);
    let newGateway: IGateway;
    let filteredGateways: IGateway[];
    switch (action.type) {
        case CLEAR_GATEWAYS:
            state = {
                ...state,
                loading: false,
                elements: [],
                error: null,
            };
            break;

        case REMOVE_GATEWAY_REQUESTED:
            state = {
                ...state,
                loading: true,
                error: null,
            };
            break;

        case REMOVE_GATEWAY_SUCCESS:
            newGateway = action.payload.gateways.entries[0];
            filteredGateways = state.elements.filter((gateway: IGateway) => gateway.serial !== newGateway.serial);
            state = {
                ...state,
                loading: false,
                elements: filteredGateways,
                error: null,
            };
            break;

        case REMOVE_GATEWAY_FAILED:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        case GET_GATEWAYS_REQUESTED:
            state = {
                ...state,
                loading: true,
            };
            break;

        case GET_GATEWAYS_SUCCESS:
            state = {
                ...state,
                loading: false,
                elements: action.payload.gateways.entries,
                error: null,
            };
            break;

        case GET_GATEWAYS_FAILED:
            state = {
                ...state,
                loading: false,
                elements: [],
                error: action.payload.error,
            };
            break;

        case GET_GATEWAY_REQUESTED:
            state = {
                ...state,
                loading: true,
            };
            break;

        case GET_GATEWAY_SUCCESS:
            newGateway = action.payload.gateways.entries[0];
            filteredGateways = state.elements.filter((gateway: IGateway) => gateway.serial !== newGateway.serial);
            state = {
                ...state,
                loading: false,
                elements: [...filteredGateways, newGateway],
                error: null,
            };
            break;

        case GET_GATEWAY_FAILED:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        case UPSERT_GATEWAY_REQUESTED:
            state = {
                ...state,
                loading: true,
            };
            break;

        case UPSERT_GATEWAY_SUCCESS:
            newGateway = action.payload.gateways.entries[0];
            filteredGateways = state.elements.filter((gateway: IGateway) => gateway.serial !== newGateway.serial);
            state = {
                ...state,
                loading: false,
                elements: [...filteredGateways, newGateway],
                error: null,
            };
            break;

        case UPSERT_GATEWAY_FAILED:
            state = {
                ...state,
                loading: false,
                elements: [],
                error: action.payload.error,
            };
            break;
        default:
            state = {
                ...state,
            };
    };

    localStorage.setItem('gateways', JSON.stringify(state));

    return state;
}

export default gateways;