export enum DatabaseTypes{
    "LOAD_REQUEST" = "@DataDB/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@DataDB/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@DataDB/LOAD_FAILURE",

    "FILTER" = "@DataDB/FILTER",
}

export type LoadRequestPayload = {
    url: string
    language: string
    setLoad: Function
}

export type FilterPayload = {
    column: string
    value: string
    currentTable: number
}

export type rows = {
    [key: string]: string | number | any[] | object | boolean
    [key: number]: string | number | any[] | object | boolean
}

export type Database = {
    table: string
    columns: string[]
    values: rows[]
}

export interface DatabaseState{
    readonly data: Database[]
    readonly search: Database[]
    readonly loading: boolean
    readonly error: boolean
}