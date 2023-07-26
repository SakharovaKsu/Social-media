import {combineReducers, createStore} from 'redux';
import {postPageReducer} from './postPageReducer';
import {dialogsReducer} from './dialogsReducer';

// объединяем функции, создаем объект
const reducers = combineReducers({
    postPage: postPageReducer,
    dialogsPage: dialogsReducer
})

export type StoreType = typeof store

// создаем store
const store = createStore(reducers)

export default store