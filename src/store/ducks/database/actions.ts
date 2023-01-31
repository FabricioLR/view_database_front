import { action } from "typesafe-actions";
import { Database, DatabaseTypes, Payload } from "./types"

export const loadRequest = (payload: Payload) => action(DatabaseTypes.LOAD_REQUEST, { payload })
export const loadSuccess = (data: Database[]) => action(DatabaseTypes.LOAD_SUCCESS, { data })
export const loadFailure = () => action(DatabaseTypes.LOAD_FAILURE)

export const filter = (payload: Pick<Payload, "currentTable"|"column"|"value">) => action(DatabaseTypes.FILTER, { payload })

export const saveNewRow = (payload: Pick<Payload, "currentTable"|"table"|"update"|"column"|"value"|"setNewRow">) => action(DatabaseTypes.SAVE_NEW_ROW, { payload })
export const saveNewRowSuccess = (data: Pick<Payload, "currentTable"|"row">) => action(DatabaseTypes.SAVE_NEW_ROW_SUCCESS, { data })
export const saveNewRowFailure = () => action(DatabaseTypes.SAVE_NEW_ROW_FAILURE)

export const deleteRow = (payload: Pick<Payload, "row"|"currentTable"|"table">) => action(DatabaseTypes.DELETE_ROW, { payload })
export const deleteRowSuccess = (data: Pick<Payload, "row"|"currentTable">) => action(DatabaseTypes.DELETE_ROW_SUCCESS, { data })
export const deleteRowFailure = () => action(DatabaseTypes.DELETE_ROW_FAILURE)