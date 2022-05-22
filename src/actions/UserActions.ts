import { SIGN_IN, SIGN_OUT } from '../constants/actions';
import IUser from '../models/IUser';

export const signinAction = (payload: IUser) => ({
    type: SIGN_IN,
    payload
});

export const signoutAction = () => ({
    type: SIGN_OUT
});
