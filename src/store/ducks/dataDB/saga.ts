import { call, put, takeEvery } from "@redux-saga/core/effects";
import api from "../../../components/api";
import { loadFailure, loadSuccess, loadRequest} from "./actions";
import { DataDBTypes } from "./types"

interface ResponseData {
    data: {
        db: any[]
    }
}

export function* load({ payload }: ReturnType<typeof loadRequest>){
    const { username, host, database, password } = payload as any
    try {
        const response: ResponseData = yield call(api.post, "/database", {
            database, password, host, username
        })

        yield put(loadSuccess(response.data.db))
    } catch (error) {
        yield put(loadFailure())
    }
}

export function* WatchLoad(){
    yield takeEvery(DataDBTypes.LOAD_REQUEST, load)
}