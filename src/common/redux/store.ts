import { AnyAction, applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { postPageReducer } from './postPageReducer'
import { dialogsReducer } from './dialogsReducer'
import { usersReducer } from './usersReducer'
import { authReducer } from './authReducer'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './appReducer'

// объединяем функции, создаем объект
const reducers = combineReducers({
    postPage: postPageReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})

const composeEnchancers = (window as any).__REDUX_DEVTOOLS_EXTENSOINS_COMPOSE__ || compose

const store = createStore(reducers, composeEnchancers(applyMiddleware(thunkMiddleware)))

export type StoreType = ReturnType<typeof reducers>

export type AppDispatchType = ThunkDispatch<StoreType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatch<StoreType, unknown, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector

export default store
