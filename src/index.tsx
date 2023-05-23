import React from 'react';
import './index.css';
import {state, addPost, addMessage} from "./redax/state";
import {renderEntireTree} from "./render";

renderEntireTree(state)