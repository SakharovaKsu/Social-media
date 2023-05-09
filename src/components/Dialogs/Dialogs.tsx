import React, {FC} from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

// type DialogsMessagesType = {
//     dialogs: DialogsType
//     messages: MessagesType
// }

const DialogItem = (props: any) => {
    return (
        <li className={s.item}>
            <NavLink className={s.link} to={`dialogs/${props.id}`}>{props.name}</NavLink>
        </li>
    )
}

const Message = (props: any) => {
    return <div className={s.message}>{props.message}</div>
};

const Dialogs = () => {

    let dialogsData:DialogsType[] = [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Olga'},
        {id: 5, name: 'Paul'},
    ]

    let messageData:MessagesType[] = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Buddy, how are you? How are you?'},
        {id: 3, message: 'Everything is just great!'},
        {id: 4, message: 'Lol'},
        {id: 5, message: 'Yes =)'},
    ]

    const dialogsElements = dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    const messagesElements = messageData.map(message => <Message message={message.message} id={message.id}/>)

    return (
        <div className={s.dialogs}>
            <ul className={s.list}>{ dialogsElements }</ul>
            <div className={s.messages}>{ messagesElements }</div>
        </div>
    )
}

export default Dialogs;