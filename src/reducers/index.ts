// Reducer functions take state from Redux and action objects and returns a new state
// Here, store has values of states of both gateways and filter

import { combineReducers } from 'redux';
import gateways from './gateways';

export default combineReducers({
    gateways
});