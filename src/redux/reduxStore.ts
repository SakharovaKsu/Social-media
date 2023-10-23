import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
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

// создаем store
// Thunk middleware (thunkMiddleware) позволяет диспатчить и функции и объекты.
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

// если не будет использовать thunkMiddleware - увидим ошибку: Error: Actions must be plain objects. Use custom middleware for async actions
// Redux ругается, что можем диспатчить только plain (простые) объекты-экшены… если хотите чего покруче, то юзайте промежуточные перехватчики middlew

// определить автоматически тип всего объекта состояния
export type StoreType = ReturnType<typeof reducers>

type AppDispatchType = ThunkDispatch<StoreType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatch<StoreType, unknown, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector

// @ts-ignore
window.store = store

export default store
