import {combineReducers, createStore} from 'redux';
import {postPageReducer} from './postPageReducer';
import {dialogsReducer} from './dialogsReducer';
import {usersReducer} from './usersReducer';
import {authReducer} from './authReducer';

// объединяем функции, создаем объект
const reducers = combineReducers({
    postPage: postPageReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type StoreType = ReturnType<typeof reducers>
// export type StoreType = typeof store

// создаем store
const store = createStore(reducers)

// @ts-ignore
window.store = store

export default store