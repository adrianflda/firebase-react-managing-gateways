import { AnyAction } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
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
    GET_GATEWAY_SUCCESS,
    REMOVE_GATEWAY_REQUESTED,
    REMOVE_GATEWAY_FAILED,
    REMOVE_GATEWAY_SUCCESS
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
    yield takeLatest(GET_GATEWAY_REQUESTED, handleGetGateway);
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
    yield takeLatest(UPSERT_GATEWAY_REQUESTED, handleUpsertGateways);
}

function* handleRemoveGateways(action: AnyAction) {
    try {
        const response: IGatewayResponse = yield call(GatewayService.delete, action.payload.serial);
        yield put({ type: REMOVE_GATEWAY_SUCCESS, payload: { gateways: response.data } });
    } catch (err: any) {
        yield put({ type: REMOVE_GATEWAY_FAILED, payload: { error: err.message } });
    }
}

export function* watcherRemoveGatewaySaga() {
    yield takeLatest(REMOVE_GATEWAY_REQUESTED, handleRemoveGateways);
}
