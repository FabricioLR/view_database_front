import { Reducer } from "redux"
import { DatabaseTypes, DatabaseState} from "./types"

const INITIAL_STATE: DatabaseState = {
    data: [],
    loading: false,
    error: false
}

const reducer: Reducer<DatabaseState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DatabaseTypes.LOAD_REQUEST:
            return { ...state, loading: true }
        case DatabaseTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case DatabaseTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        default:
            return state
    }
}

export default reducer