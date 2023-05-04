import React, {FC} from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

// type DialogsType = {
//     id: string
//     name: string
// }
//
// type MessagesType = {
//     message: string
// }
//
// type DialogsMessagesType = {
//     dialogs: DialogsType
//     messages: MessagesType
// }

const DialogItem = (props: any) => {
    return (
        <li className={s.item}>
            <NavLink to={`dialogs/${props.id}`}>{props.name}</NavLink>
        </li>
    )
}

const Message = (props: any) => {
    return <div className={s.message}>{props.message}</div>
};

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <ul className={s.list}>
                <DialogItem name='Dima' id='1' />
                <DialogItem name='Valera' id='2' />
                <DialogItem name='Sveta' id='3' />
                <DialogItem name='Olga' id='4' />
                <DialogItem name='Paul' id='5' />
            </ul>
            <div className={s.messages}>
                <Message message='Hi'/>
                <Message message='Buddy, how are you? How are you?'/>
                <Message message='Everything is just great!'/>
            </div>
        </div>
    )
}

export default Dialogs;