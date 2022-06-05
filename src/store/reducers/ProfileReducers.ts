import { SIGN_UP_FAILED, SIGN_UP_REQUESTED, SIGN_UP_SUCCESS } from '../constants';
import IProfile from '../../models/IProfile';
import { ProfileState } from '../types';

const storedProfile = () => {
    const localProfile = localStorage.getItem('profile');
    if (localProfile) {
        return JSON.parse(localProfile);
    } else {
        return {}
    }
};

const initialState: ProfileState = {
    loading: false,
    elements: [],
    error: null,
    ...storedProfile()
};

const profile = (state = initialState, action: any): IProfile | {} => {
    switch (action.type) {
        case SIGN_UP_REQUESTED:
            state = {
                ...state,
                loading: true,
                error: null,
            };
            break;

        case SIGN_UP_SUCCESS:
            state = {
                ...state,
                loading: false,
                profile: action.payload.profile,
                error: null,
            };
            break;

        case SIGN_UP_FAILED:
            state = {
                ...state,
                loading: false,
                profile: null,
                error: action.payload.error,
            };
            break;

        default:
            return state;
    }

    localStorage.setItem('profile', JSON.stringify(state));

    return state;
}

export default profile;