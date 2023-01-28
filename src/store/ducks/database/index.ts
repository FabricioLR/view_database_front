import { Reducer } from "redux"
import { DatabaseTypes, DatabaseState, rows} from "./types"

const INITIAL_STATE: DatabaseState = {
    data: [],
    search: [],
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
            var filteredValues: rows[]
            const column = action.payload.column
            const value = action.payload.value
            const currentTable = action.payload.currentTable
            const table = state.data[currentTable]

            if (value == "" && column == ""){
                console.log(value, column)
                return { ...state, search: [ ...state.data ]}
            }
            const columnIndex = table.columns.indexOf(column)
            if (columnIndex < 0) return { ...state }
            filteredValues = table.values.filter((_value) => value != "" ? String(_value[column]).toLowerCase().includes(String(value).toLowerCase()) : _value)
            return { ...state, search: state.search.map((value, index) => index == currentTable ?  { ...state.search[currentTable], values: filteredValues } : value)}
        default:
            return state
    }
}

export default reducer