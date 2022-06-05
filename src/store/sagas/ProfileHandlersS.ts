import { AnyAction } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { IProfileResponse } from "../../models/IProfile";
import ProfileService from "../../services/ProfileService";
import {
    SIGN_UP_FAILED,
    SIGN_UP_REQUESTED,
    SIGN_UP_SUCCESS,
} from "../constants";

function* handleUpsertProfiles(action: AnyAction) {
    try {
        const response: IProfileResponse = yield call(ProfileService.upsert, action.payload);
        yield put({ type: SIGN_UP_SUCCESS, payload: { profile: response.data } });
    } catch (err: any) {
        yield put({ type: SIGN_UP_FAILED, payload: { error: err.message } });
    }
}

export function* watcherUpsertProfileSaga() {
    yield takeLatest(SIGN_UP_REQUESTED, handleUpsertProfiles);
}
