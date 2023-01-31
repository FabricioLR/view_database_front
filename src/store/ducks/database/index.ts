import { Reducer } from "redux"
import { DatabaseTypes, DatabaseState, row } from "./types"

const INITIAL_STATE: DatabaseState = {
    data: [
        {
            table: "users",
            columns: ["id", "name", "email", "password", "image", "isAdmin"],
            values: [
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
            ]
        }
    ],
    search: [
        {
            table: "users",
            columns: ["id", "name", "email", "password", "image", "isAdmin"],
            values: [
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
                {
                    id: "1", name: "teste", email: "test@test.com", password: "teste", image: "teste", isAdmin: true
                },
            ]
        }
    ],
    loading: false,
    error: false
}

const reducer: Reducer<DatabaseState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DatabaseTypes.LOAD_REQUEST:
            return { ...state, loading: true }
        case DatabaseTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data, search: action.payload.data }
        case DatabaseTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        case DatabaseTypes.FILTER:
            var filteredValues: row[]
            const column = action.payload.column
            const value = action.payload.value
            var currentTable = action.payload.currentTable
            const table = state.data[currentTable]

            if (value == "" && column == "") return { ...state, search: [ ...state.data ] }

            const columnIndex = table.columns.indexOf(column)
            if (columnIndex < 0) return { ...state }

            filteredValues = table.values.filter((_value) => value != "" ? String(_value[column]).toLowerCase().includes(String(value).toLowerCase()) : _value)
            return { ...state, search: state.search.map((value, index) => index == currentTable ?  { ...state.search[currentTable], values: filteredValues } : value)}
        case DatabaseTypes.SAVE_NEW_ROW:
            return { ...state, loading: true }
        case DatabaseTypes.SAVE_NEW_ROW_SUCCESS:
            var currentTable = action.payload.data.currentTable
            return { ...state, loading: false, error: false, data: state.data.map((value, index) => index == currentTable ? { ...state.data[currentTable], values: [ ...state.data[currentTable].values, { ...action.payload.data.row } ] } : value) }
        case DatabaseTypes.SAVE_NEW_ROW_FAILURE:
            return { ...state, loading: false, error: true }
        case DatabaseTypes.DELETE_ROW:
            return { ...state, loading: true }
        case DatabaseTypes.DELETE_ROW_SUCCESS:
            var currentTable = action.payload.data.currentTable
            return { ...state, data: state.data.map((value, index) => index == currentTable ? { ...state.data[currentTable], values: state.data[currentTable].values.filter(row => JSON.stringify(row) != JSON.stringify(action.payload.data.row))} : value) }
        case DatabaseTypes.DELETE_ROW_FAILURE:
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}

export default reducer