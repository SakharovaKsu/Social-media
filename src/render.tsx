import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {addPost, addMessage, StateType} from "./redax/state";

type RenderEntireTreeType = {
    state: StateType
}
export const renderEntireTree = (state:StateType) => {
    ReactDOM.render(
        <App state={state} addPost={addPost} addMessage={addMessage}/>,
        document.getElementById('root')
    );
}