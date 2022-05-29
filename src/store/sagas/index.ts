import { all } from "redux-saga/effects";
import {
    watcherGetGatewaySaga,
    watcherGetGatewaysSaga,
    watcherUpsertGatewaySaga
} from "./GatewayHandlers";

export default function* rootSaga() {
    yield all([
        watcherGetGatewaySaga(),
        watcherGetGatewaysSaga(),
        watcherUpsertGatewaySaga()
    ]);
}
