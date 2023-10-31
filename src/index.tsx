import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { StateType } from './redux/state'
import { App } from './App'

export const renderEntireTree = (state: StateType) => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
