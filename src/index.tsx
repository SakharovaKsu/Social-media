import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {addPost, addMessage, updateNewPostText, state, subscribe, StateType} from "./redux/state";

export const renderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <App state={state}
             addPost={addPost}
             addMessage={addMessage}
             updateNewPostText={updateNewPostText}/>,
        document.getElementById('root')
    );
}

renderEntireTree(state)

subscribe(renderEntireTree)