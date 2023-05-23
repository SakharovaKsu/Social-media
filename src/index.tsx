import React from 'react';
import './index.css';
import {state, addPost, addMessage} from "./redux/state";
import {renderEntireTree} from "./render";

renderEntireTree(state)