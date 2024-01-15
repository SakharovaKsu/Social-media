import React from 'react'
import './App.css'
import store from './common/redux/store'
import { Provider } from 'react-redux'
import { AppContainer } from './AppContainer'

export const App = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    )
}
