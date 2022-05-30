import { all } from "redux-saga/effects";
import {
    watcherGetGatewaySaga,
    watcherGetGatewaysSaga,
    watcherRemoveGatewaySaga,
    watcherUpsertGatewaySaga
} from "./GatewayHandlers";

export default function* rootSaga() {
    yield all([
        watcherGetGatewaySaga(),
        watcherGetGatewaysSaga(),
        watcherUpsertGatewaySaga(),
        watcherRemoveGatewaySaga()
    ]);
}
