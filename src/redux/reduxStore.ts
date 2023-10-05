import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {postPageReducer} from './postPageReducer';
import {dialogsReducer} from './dialogsReducer';
import {usersReducer} from './usersReducer';
import {authReducer} from './authReducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';

// объединяем функции, создаем объект
const reducers = combineReducers({
    postPage: postPageReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

// создаем store
// Thunk middleware (thunkMiddleware) позволяет диспатчить и функции и объекты.
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

// если не будет использовать thunkMiddleware - увидим ошибку: Error: Actions must be plain objects. Use custom middleware for async actions
// Redux ругается, что можем диспатчить только plain (простые) объекты-экшены… если хотите чего покруче, то юзайте промежуточные перехватчики middlew

// определить автоматически тип всего объекта состояния
export type StoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store

export default store