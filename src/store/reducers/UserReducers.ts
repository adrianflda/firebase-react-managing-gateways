import {
    SIGN_IN,
    SIGN_OUT
} from '../constants';
import IUser from '../../models/IUser';
import { storedUser } from '../../services/FireAuthService';

const user = (state = storedUser(), action: { type: string, payload: IUser }): IUser | null => {
    switch (action.type) {
        case SIGN_IN:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;

        case SIGN_OUT:
            localStorage.setItem('user', '');
            return null;

        default:
            return state;
    }
}

export default user;