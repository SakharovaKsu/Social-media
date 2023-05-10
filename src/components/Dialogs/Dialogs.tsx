import React, {FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem /DialogItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redax/state";
import TextArea from "./TextArea/TextArea";

const Dialogs:FC<DialogsPageType> = (props) => {

    const dialogsElements = props.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} src={dialog.src}/>);
    const messagesElements = props.messageData.map(message => <Message message={message.message} id={message.id}/>)

    return (
        <div className={s.dialogs}>
            <ul className={s.list}>{ dialogsElements }</ul>
            <div>
                <div className={s.messagesList}>{ messagesElements }</div>
                <TextArea name={'Отправить'}/>
            </div>
        </div>
    )
}

export default Dialogs;