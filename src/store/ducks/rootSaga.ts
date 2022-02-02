import { all, takeLatest } from "redux-saga/effects"
import { load, WatchLoad } from "./dataDB/saga"
import { DataDBTypes } from "./dataDB/types"

export default function* rootSaga(){
    yield all([
        takeLatest(DataDBTypes.LOAD_REQUEST, load)
    ])
}