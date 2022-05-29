import { createSelector } from "reselect";
import { RootState } from "../reducers";

const getGatewayState = (state: RootState) => state.gateways;

export const getGatewayStateSelector = createSelector(getGatewayState, (gateways) => gateways);
