import {combineReducers, createStore} from 'redux';
import {postPageReducer} from './postPageReducer';
import {dialogsReducer} from './dialogsReducer';

// объединяем функции, создаем объект
const reducers = combineReducers({
    postPage: postPageReducer,
    dialogsPage: dialogsReducer
})

// создаем store
const store = createStore(reducers)

export default store