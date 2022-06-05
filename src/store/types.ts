import IGateway from "../models/IGateway";
import IProfile from "../models/IProfile";

export interface GatewayState {
    loading: boolean,
    elements: IGateway[],
    error: string | null,
}

export interface ProfileState {
    loading: boolean,
    profile: IProfile | null,
    error: string | null,
};