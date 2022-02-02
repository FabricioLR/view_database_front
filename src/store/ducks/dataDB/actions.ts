import { action } from "typesafe-actions";
import { DataDBTypes } from "./types"

type Payload = {
    username: string
    password: string
    host: string
    database: string
}

export const loadRequest = (payload: Payload) => action(DataDBTypes.LOAD_REQUEST, { payload })

export const loadSuccess = (data: any[]) => action(DataDBTypes.LOAD_SUCCESS, { data })

export const loadFailure = () => action(DataDBTypes.LOAD_FAILURE)
