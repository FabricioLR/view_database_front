import { Reducer } from "redux"
import { DataDBTypes, DataDBState} from "./types"

const INITIAL_STATE: DataDBState = {
    data: [],
    loading: false,
    error: false
}

const reducer: Reducer<DataDBState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DataDBTypes.LOAD_REQUEST:
            return { ...state, loading: true }
        case DataDBTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case DataDBTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        default:
            return state
    }
}

export default reducer