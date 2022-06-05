import { SIGN_IN, SIGN_OUT, SIGN_UP_REQUESTED } from '../constants';
import IUser from '../../models/IUser';
import IProfile from '../../models/IProfile';

export const signinAction = (payload: IUser) => ({
    type: SIGN_IN,
    payload
});

export const signupAction = (payload: IProfile) => ({
    type: SIGN_UP_REQUESTED,
    payload
});

export const signoutAction = () => ({
    type: SIGN_OUT
});
