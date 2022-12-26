export enum DatabaseTypes{
    "LOAD_REQUEST" = "@DataDB/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@DataDB/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@DataDB/LOAD_FAILURE"
}

export type LoadRequestPayload = {
    url: string
    language: string
    setLoad: Function
}

export type Database = {
    table: string
    columns: string[]
    values: {
        [key: string]: string | number | any[] | object
        [key: number]: string | number | any[] | object
    }[]
}

export interface DatabaseState{
    readonly data: Database[]
    readonly loading: boolean
    readonly error: boolean
}