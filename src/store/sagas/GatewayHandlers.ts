import { AnyAction } from "redux";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import IGateway, { IGatewayResponse } from "../../models/IGateway";
import GatewayService from "../../services/GatewayService";
import {
    GET_GATEWAYS_SUCCESS,
    GET_GATEWAYS_FAILED,
    GET_GATEWAYS_REQUESTED,
    UPSERT_GATEWAY_FAILED,
    UPSERT_GATEWAY_REQUESTED,
    UPSERT_GATEWAY_SUCCESS,
    GET_GATEWAY_FAILED,
    GET_GATEWAY_REQUESTED,
    GET_GATEWAY_SUCCESS
} from "../constants";

function* handleGetGateways() {
    try {
        const response: IGatewayResponse = yield call(GatewayService.getAll);
        yield put({ type: GET_GATEWAYS_SUCCESS, payload: { gateways: response.data } });
    } catch (err: any) {
        yield put({ type: GET_GATEWAYS_FAILED, payload: { error: err.message } });
    }
}

export function* watcherGetGatewaysSaga() {
    yield takeLatest(GET_GATEWAYS_REQUESTED, handleGetGateways);
}

function* handleGetGateway(action: AnyAction) {
    try {
        const response: IGatewayResponse = yield call(GatewayService.get, action.payload);
        yield put({ type: GET_GATEWAY_SUCCESS, payload: { gateways: response.data } });
    } catch (err: any) {
        yield put({ type: GET_GATEWAY_FAILED, payload: { error: err.message } });
    }
}

export function* watcherGetGatewaySaga() {
    yield takeEvery(GET_GATEWAY_REQUESTED, handleGetGateway);
}

function* handleUpsertGateways(action: AnyAction) {
    try {
        const response: IGatewayResponse = yield call(GatewayService.upsert, action.payload);
        yield put({ type: UPSERT_GATEWAY_SUCCESS, payload: { gateways: response.data } });
    } catch (err: any) {
        yield put({ type: UPSERT_GATEWAY_FAILED, payload: { error: err.message } });
    }
}

export function* watcherUpsertGatewaySaga() {
    yield takeEvery(UPSERT_GATEWAY_REQUESTED, handleUpsertGateways);
}
