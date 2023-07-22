import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {StateType, store} from './redux/state';

export const renderEntireTree = (state: StateType) => {
    // store.getState() - нужно вызвать, что б получить state, a addPost не вызываем, так как передаем его дальше.
    // Когда мы отдаем кому-то метод (в нашем случае пропсам), то что б при вызове этого метода не было undefined, то используем такой лайфхак -> store.addPost.bind(store) (через bind мы связываем метод со store)

    ReactDOM.render(
        <App store={store.getState()}
             dispatch={store.dispatch.bind(store)}/>,
        document.getElementById('root')
    );
}

renderEntireTree(store.getState())

store.subscribe(renderEntireTree)