import { Dispatch, RefObject, SetStateAction } from "react"
import { Database } from "../../store/ducks/database/types"

export type TableProps = {
    database: Database
    setNewRow: Function
    newRow: row
    saveNewRow: Function
    deleteRow: Function
    updateValue: Function
    setPopUp: Dispatch<SetStateAction<PopUpProps | undefined>>
}

export type HeaderProps = {
    connection: Function
    setUrl: Function
    load: string
    setLanguage: Function
}

export type UseOutsideCLickData = {
    ref: RefObject<HTMLInputElement> 
    setFunction: Dispatch<SetStateAction<UpdateData | undefined>>
}

export type UpdateData = {
    row: row
    update: row
    rowIndex: number
    columnIndex: number
}

export type PopUpProps = {
    message: string
    confirm: Function
    deny: Function
}

export type row = {
    [key: string]: string | number | any[] | object | boolean
    [key: number]: string | number | any[] | object | boolean
}