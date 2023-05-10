import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


type DialogsType = {
    id: number
    name: string
}

const dialogsData:DialogsType[] = [
    {id: 1, name: 'Dima'},
    {id: 2, name: 'Valera'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Olga'},
    {id: 5, name: 'Paul'},
]

type MessagesType = {
    id: number
    message: string
}

const messageData:MessagesType[] = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Buddy, how are you? How are you?'},
    {id: 3, message: 'Everything is just great!'},
    {id: 4, message: 'Lol'},
    {id: 5, message: 'Yes =)'},
]

export type PostDataType = {
    id: number
    message: string
    lireCount: number
}

const postsData:PostDataType[] = [
    {id: 1, message: 'Hi', lireCount: 4},
    {id: 2, message: 'Good', lireCount: 22},
]

ReactDOM.render(
    <App postsData={postsData} messageData={messageData} dialogsData={dialogsData} />,
  document.getElementById('root')
);