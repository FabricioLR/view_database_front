import { action } from "typesafe-actions";
import { Database, DatabaseTypes, FilterPayload, LoadRequestPayload } from "./types"

export const loadRequest = (payload: LoadRequestPayload) => action(DatabaseTypes.LOAD_REQUEST, { payload })
export const loadSuccess = (data: Database[]) => action(DatabaseTypes.LOAD_SUCCESS, { data })
export const loadFailure = () => action(DatabaseTypes.LOAD_FAILURE)

export const filter = (payload: FilterPayload) => action(DatabaseTypes.FILTER, { payload })
