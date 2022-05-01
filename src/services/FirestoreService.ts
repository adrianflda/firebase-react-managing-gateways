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
        return Promise.resolve(undefined);
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
}

export default new GatewayDataService();