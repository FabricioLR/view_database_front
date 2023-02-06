import { action } from "typesafe-actions";
import { Database, DatabaseTypes, Payload } from "./types"

export const loadRequest = (payload: { payload: Pick<Payload["payload"], "url"|"language"|"setLoad">, type: string }) => action(DatabaseTypes.LOAD_REQUEST, { payload })
export const loadSuccess = (data: Database[]) => action(DatabaseTypes.LOAD_SUCCESS, { data })
export const loadFailure = () => action(DatabaseTypes.LOAD_FAILURE)

export const filter = (payload: { payload: Pick<Payload["payload"], "tableName"|"column"|"value"|"tableIndex">, type: string }) => action(DatabaseTypes.FILTER, { payload })

export const saveNewRow = (payload: { payload: Pick<Payload["payload"], "tableName"|"update"|"column"|"value"|"setNewRow"|"tableIndex">, type: string }) => action(DatabaseTypes.SAVE_NEW_ROW, { payload })
export const saveNewRowSuccess = (data: Pick<Payload["payload"], "row"|"tableIndex">) => action(DatabaseTypes.SAVE_NEW_ROW_SUCCESS, { data })
export const saveNewRowFailure = () => action(DatabaseTypes.SAVE_NEW_ROW_FAILURE)

export const deleteRow = (payload: { payload: Pick<Payload["payload"], "row"|"tableName"|"tableIndex">, type: string }) => action(DatabaseTypes.DELETE_ROW, { payload })
export const deleteRowSuccess = (data: Pick<Payload["payload"], "row"|"tableIndex">) => action(DatabaseTypes.DELETE_ROW_SUCCESS, { data })
export const deleteRowFailure = () => action(DatabaseTypes.DELETE_ROW_FAILURE)

export const updateValue = (payload: { payload: Pick<Payload["payload"], "tableName"|"row"|"update"|"tableIndex"|"rowIndex">, type: string }) => action(DatabaseTypes.UPDATE_VALUE, { payload })
export const updateValueSuccess = (data: Pick<Payload["payload"], "tableIndex"|"update"|"rowIndex">) => action(DatabaseTypes.UPDATE_VALUE_SUCCESS, { data })
export const updateValueFailure = () => action(DatabaseTypes.UPDATE_VALUE_FAILURE)