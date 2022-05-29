import DeviceStatusEnum from "../enums/DeviceStatusEnum";
import IGateway, { IGatewayResponse } from "../models/IGateway";
import { getRequest, postRequest } from "./Axios";

export const GATEWAYS: IGateway[] = [
    {
        serial: '1',
        name: 'nombre 1',
        address: '10.20.10.1',
        devices: [
            {
                uuid: 121212,
                vendor: 'vendedor',
                createdAt: new Date(),
                status: DeviceStatusEnum.online
            },
            {
                uuid: 2222222,
                vendor: 'vendedor2',
                createdAt: new Date(),
                status: DeviceStatusEnum.offline
            }
        ],
        deleted: false
    },
    {
        serial: '2',
        name: 'nombre 2',
        address: '10.20.10.1',
        devices: [],
        deleted: false
    },
    {
        serial: '3',
        name: 'nombre 3',
        address: '10.20.10.1',
        devices: [],
        deleted: false
    }
];

class GatewayService {
    async getAll(): Promise<IGatewayResponse> {
        const response = await getRequest('gateways');
        return response.data
    }

    async get(serial: string): Promise<IGateway | undefined> {
        return Promise.resolve(GATEWAYS.find((gateway) => gateway.serial === serial));
    }

    async upsert(newGateway: IGateway): Promise<IGatewayResponse> {
        const response = await postRequest('gateways', newGateway);
        return response.data
    }

    async delete(serial: string): Promise<IGateway | undefined> {
        return Promise.resolve(undefined);
    }

    async deleteAll(): Promise<IGateway | undefined> {
        return Promise.resolve(undefined);
    }

    async findByName(name: string): Promise<IGateway[]> {
        return Promise.resolve([]);
    }

    isValidateGateway(gateway: IGateway): boolean {
        const errors: any = {};
        if (!gateway) {
            errors.gateway = 'no gateway to validate';
        }
        if (!gateway.serial) {
            errors.serial = 'no serial found';
        }
        if (gateway.address && !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(gateway.address)) {
            errors.address = 'no valid ipv4 address';
        }
        if (gateway.devices && gateway.devices.length > 10) {
            errors.devices = 'only 10 devices by gateway allowed';
        }
        if (Object.keys(errors).length > 0) {
            throw new Error(JSON.stringify(errors));
        }
        return true;
    }
}

export default new GatewayService();