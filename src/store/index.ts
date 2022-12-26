import { configureStore, Store } from "@reduxjs/toolkit"
import createMiddleware from "redux-saga"
import { DatabaseState } from "./ducks/database/types"

import rootReducer from "./ducks/rootReducer"
import rootSaga from "./ducks/rootSaga"

const sagaMiddleware = createMiddleware()

export type ApplicationState = {
    database: DatabaseState
}

const store: Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
    }
})

sagaMiddleware.run(rootSaga)

export default store