export default interface IProfile {
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
}

export interface IProfileResponse {
    data: IProfile,
    message: "Profile processed successfully"
    status: "success"
}