import { all, takeLatest } from "redux-saga/effects"
import { DeleteRow, GetDatabase, SaveNewRow } from "./database/saga"
import { DatabaseTypes } from "./database/types"

export default function* rootSaga(){
    yield all([
        takeLatest(DatabaseTypes.LOAD_REQUEST, GetDatabase),
        takeLatest(DatabaseTypes.SAVE_NEW_ROW, SaveNewRow),
        takeLatest(DatabaseTypes.DELETE_ROW, DeleteRow)
    ])
}