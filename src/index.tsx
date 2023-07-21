import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {StateType, store} from './redux/state';
import {isUndefined} from 'util';

export const renderEntireTree = (state: StateType) => {
    // store.getState() - нужно вызвать, что б получить state, a addPost не вызываем, так как передаем его дальше.
    // Когда мы отдаем кому-то метод (в нашем случае пропсам), то что б при вызове этого метода не было undefined, то используем такой лайфхак -> store.addPost.bind(store) (через bind мы связываем метод со store)

    ReactDOM.render(
        <App state={store.getState()}
             addPost={store.addPost.bind(store)}
             addMessage={store.addMessage.bind(store)}
             updateNewPostText={store.updateNewPostText.bind(store)}/>,
        document.getElementById('root')
    );
}

renderEntireTree(store.getState())

store.subscribe(renderEntireTree)