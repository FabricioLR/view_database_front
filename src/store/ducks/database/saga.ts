import { call, put } from "@redux-saga/core/effects";
import api from "../../../components/api";
import { loadFailure, loadSuccess, loadRequest, saveNewRow, saveNewRowFailure, saveNewRowSuccess, filter, deleteRow, deleteRowFailure } from "./actions";
import { Database, row } from "./types"

interface ResponseData {
    data: {
        result: {
            database: Database[]
        },
    },
}

interface ResponseData2 {
    data: {
        result: row
    },
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

export function* SaveNewRow({ payload }: ReturnType<typeof saveNewRow>){
    const { currentTable, setNewRow, update, table } = payload as any
    try {
        const response: ResponseData2 = yield call(api.post, "/saveRow", { update, table })

        yield put(saveNewRowSuccess({ row: response.data.result, currentTable }))
        setNewRow({})
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(saveNewRowFailure())
    }
}

export function* DeleteRow({ payload }: ReturnType<typeof deleteRow>){
    console.log(payload)
    try {
        
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(deleteRowFailure())
    }
}