import { all, takeLatest } from "redux-saga/effects"
import { GetDatabase } from "./database/saga"
import { DatabaseTypes } from "./database/types"

export default function* rootSaga(){
    yield all([
        takeLatest(DatabaseTypes.LOAD_REQUEST, GetDatabase)
    ])
}