import { row } from "../../../components/types/types"

export enum DatabaseTypes{
    "LOAD_REQUEST" = "@DataDB/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@DataDB/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@DataDB/LOAD_FAILURE",

    "FILTER" = "@DataDB/FILTER",

    "SAVE_NEW_ROW" = "@DataDB/SAVE_NEW_ROW",
    "SAVE_NEW_ROW_FAILURE" = "@DataDB/SAVE_NEW_ROW_FAILURE",
    "SAVE_NEW_ROW_SUCCESS" = "@DataDB/SAVE_NEW_ROW_SUCCESS",

    "DELETE_ROW" = "@DataDB/DELETE_ROW",
    "DELETE_ROW_FAILURE" = "@DataDB/DELETE_ROW_FAILURE",
    "DELETE_ROW_SUCCESS" = "@DataDB/DELETE_ROW_SUCCESS",

    "UPDATE_VALUE" = "@DataDB/UPDATE_VALUE",
    "UPDATE_VALUE_FAILURE" = "@DataDB/UPDATE_VALUE_FAILURE",
    "UPDATE_VALUE_SUCCESS" = "@DataDB/UPDATE_VALUE_SUCCESS",
}

export type Payload = {
    payload: {
        setLoad: Function
        setNewRow: Function
        url: string
        language: string
        searchValue: string
        column: string
        columnIndex: number
        value: string
        row: row
        rowIndex: number
        tableName: string
        tableIndex: number
        update: row
    }
    type: string
}

export type Database = {
    table: string
    columns: string[]
    values: row[]
}

export interface DatabaseState{
    readonly data: Database[]
    readonly search: Database[]
    readonly loading: boolean
    readonly error: boolean
}