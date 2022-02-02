export enum DataDBTypes{
    "LOAD_REQUEST" = "@DataDB/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@DataDB/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@DataDB/LOAD_FAILURE"
}

export interface DataDB{
    db: any[]
}

export interface DataDBState{
    readonly data: any[]
    readonly loading: boolean
    readonly error: boolean
}