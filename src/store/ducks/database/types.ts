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
}

export type Payload = {
    url: string
    language: string
    setLoad: Function
    setNewRow: Function
    searchValue: string
    column: string
    value: string
    currentTable: number
    row: row
    table: string
    update: row
}

export type row = {
    [key: string]: string | number | any[] | object | boolean
    [key: number]: string | number | any[] | object | boolean
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