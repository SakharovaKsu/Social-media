import React from 'react'
import './App.css'
import store from './redux/reduxStore'
import { Provider } from 'react-redux'
import { renderEntireTree } from './index'
import { AppContainer } from './AppContainer'

// store.getState() - нужно вызвать, что б получить state.
// Когда мы отдаем кому-то метод (в нашем случае пропсам), то что б при вызове этого метода не было undefined, то используем такой лайфхак -> store.dispatch.bind(store) (через bind мы связываем метод со store)

// Provider - обеспечивает доступ к Redux Store для всех компонентов, которые находятся внутри его дочерних элементов.

export const App = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    )
}

renderEntireTree(store.getState())

// Добавляем анонимную функцию, для того что бы добавить туда стейт и перекинуть его в renderEntireTree. Зачем? При изменении стейта нам нужно каждый раз запрашивать его. Мы его повторно не получаем, у нас будет undefined, поэтому и передаем заново - renderEntireTree(state)
store.subscribe(() => {
    const state = store.getState()
    renderEntireTree(state)
})
