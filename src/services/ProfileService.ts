import IProfile, { IProfileResponse } from "../models/IProfile";
import { getRequest, postRequest } from "./Axios";

class ProfileService {
    async get(uid: string): Promise<IProfile | undefined> {
        const response = await getRequest(`profiles/${uid}`);
        return response.data
    }

    async upsert(newProfile: IProfile): Promise<IProfileResponse> {
        const response = await postRequest('profiles/', newProfile);
        return response.data
    }
}

export default new ProfileService();