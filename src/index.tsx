import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import store, { StoreType } from './common/redux/store'

export const renderEntireTree = (state: StoreType) => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
renderEntireTree(store.getState())

store.subscribe(() => {
    const state = store.getState()
    renderEntireTree(state)
})
