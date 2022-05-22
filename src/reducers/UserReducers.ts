import { SIGN_IN, SIGN_OUT } from '../constants/actions';
import IUser from '../models/IUser';

// Check localStorage for saved Users, else return null array
const storedUsers = () => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
        return JSON.parse(localUser);
    } else {
        return null;
    }
};

const user = (state = storedUsers(), action: { type: string, payload: IUser }): IUser | {} => {
    switch (action.type) {
        case SIGN_IN:
            localStorage.setItem('user', JSON.stringify([action.payload]));
            return action.payload;

        case SIGN_OUT:
            localStorage.setItem('user', '');
            return {};

        default:
            return state;
    }
}

export default user;