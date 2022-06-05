import { all } from 'redux-saga/effects';
import { watcherUpsertProfileSaga } from './ProfileHandlersS';
import {
    watcherGetGatewaySaga,
    watcherGetGatewaysSaga,
    watcherRemoveGatewaySaga,
    watcherUpsertGatewaySaga
} from './GatewayHandlers';

export default function* rootSaga() {
    yield all([
        watcherUpsertProfileSaga(),
        watcherGetGatewaySaga(),
        watcherGetGatewaysSaga(),
        watcherUpsertGatewaySaga(),
        watcherRemoveGatewaySaga()
    ]);
}
