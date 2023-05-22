import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {state, addPost, addMessage} from "./redax/state";

ReactDOM.render(
    <App state={state} addPost={addPost} addMessage={addMessage}/>,
  document.getElementById('root')
);