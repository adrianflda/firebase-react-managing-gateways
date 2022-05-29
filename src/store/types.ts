import IGateway from "../models/IGateway";

export interface GatewayState {
    loading: boolean;
    elements: IGateway[];
    error: string | null;
}