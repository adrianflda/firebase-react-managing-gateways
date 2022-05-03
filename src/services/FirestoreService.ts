import IGateway from "../models/IGateway";

export const GATEWAYS: IGateway[] = [
    {
        serial: '1',
        name: 'nombre 1',
        address: '10.20.10.1',
        devices: [],
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

class GatewayDataService {
    async getAll(): Promise<IGateway[]> {
        return Promise.resolve(GATEWAYS);
    }
    async get(serial: string): Promise<IGateway | undefined> {
        return Promise.resolve(GATEWAYS.find((gateway) => gateway.serial === serial));
    }
    async create(data: IGateway): Promise<IGateway> {
        return Promise.resolve(data);
    }
    async update(serial: string, data: IGateway): Promise<IGateway | undefined> {
        return Promise.resolve(data);
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
        if (!gateway) {
            throw new Error('no gateway to validate');
        }
        if (!gateway.serial) {
            throw new Error('no serial found');
        }
        if (gateway.address && !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(gateway.address)) {
            throw new Error('no valid ipv4 address');
        }
        if (gateway.devices && gateway.devices.length > 10) {
            throw new Error('only 10 devices by gateway allowed');
        }
        return true;
    }
}

export default new GatewayDataService();