import { call, put } from "@redux-saga/core/effects";
import api from "../../../components/api";
import { loadFailure, loadSuccess, loadRequest} from "./actions";
import { Database } from "./types"

interface ResponseData {
    data: {
        result: {
            database: Database[]
        }
    }
}

export function* GetDatabase({ payload }: ReturnType<typeof loadRequest>){
    const { url, language, setLoad } = payload as any

    try {
        const response: ResponseData = yield call(api.post, "/database", {
            url, language
        })

        setLoad("Connect")

        yield put(loadSuccess(response.data.result.database))
    } catch (error: any) {
        setLoad("Connect")
        alert(error.response.data.error)
        yield put(loadFailure())
    }
}