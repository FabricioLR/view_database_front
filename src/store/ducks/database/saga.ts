import { call, put } from "@redux-saga/core/effects";
import api from "../../../components/api";
import { row } from "../../../components/types/types";
import { loadFailure, loadSuccess, loadRequest, saveNewRow, saveNewRowFailure, saveNewRowSuccess, deleteRow, deleteRowFailure, deleteRowSuccess, updateValue, updateValueFailure, updateValueSuccess } from "./actions";
import { Database } from "./types";

type ResponseData = {
    data: {
        result: { database: Database[], type: "1" } | { row: row, type: "2" }
    }
}

export function* GetDatabase({ payload }: Parameters<typeof loadRequest>[0]){
    const { url, language, setLoad } = payload
    try {
        const response: ResponseData & { data: ResponseData["data"] & { result: Extract<ResponseData["data"]["result"], { type: "1" }>}} = yield call(api.post, "/database", {
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

export function* SaveNewRow({ payload }: Parameters<typeof saveNewRow>[0]){
    const { setNewRow, update, tableIndex, tableName } = payload
    try {
        const response: ResponseData & { data: ResponseData["data"] & { result: Extract<ResponseData["data"]["result"], { type: "2" }>}} = yield call(api.post, "/saveRow", { update, table: tableName })

        yield put(saveNewRowSuccess({ row: response.data.result.row, tableIndex }))
        setNewRow({})
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(saveNewRowFailure())
    }
}

export function* DeleteRow({ payload }: Parameters<typeof deleteRow>[0]){
    const { row, tableName, tableIndex } = payload
    try {
        yield call(api.post, "/deleteRow", { row, table: tableName })

        yield put(deleteRowSuccess({ row, tableIndex }))
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(deleteRowFailure())
    }
}

export function* UpdateValue({ payload }: Parameters<typeof updateValue>[0]){
    const { row, tableName, tableIndex, update, rowIndex } = payload
    try {
        yield call(api.post, "/updateValue", { row, table: tableName, update })

        yield put(updateValueSuccess({ tableIndex, update, rowIndex }))
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(updateValueFailure())
    }
}