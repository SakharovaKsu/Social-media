import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import store, { StoreType } from './common/redux/store'

export const renderEntireTree = (state: StoreType) => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
renderEntireTree(store.getState())

// Добавляем анонимную функцию, для того что бы добавить туда стейт и перекинуть его в renderEntireTree. Зачем? При изменении стейта нам нужно каждый раз запрашивать его. Мы его повторно не получаем, у нас будет undefined, поэтому и передаем заново - renderEntireTree(state)
store.subscribe(() => {
    const state = store.getState()
    renderEntireTree(state)
})
