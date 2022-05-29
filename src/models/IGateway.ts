import IDevice from './IDevice';

export default interface IGateway {
    serial: string,
    name: string,
    address: string,
    devices: IDevice[],
    deleted: boolean
}

export interface IGatewayResponse {
    data: { entries: IGateway[], lastElementId?: string | null, total?: number },
    message: "Gateway processed successfully"
    status: "success"
}
