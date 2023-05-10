import React, {FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem /DialogItem";
import Message from "./Message/Message";

const Dialogs = (props:any) => {

    const dialogsElements = props.dialogsData.map((dialog:any) => <DialogItem name={dialog.name} id={dialog.id}/>);
    const messagesElements = props.messageData.map((message:any) => <Message message={message.message} id={message.id}/>)

    return (
        <div className={s.dialogs}>
            <ul className={s.list}>{ dialogsElements }</ul>
            <div className={s.messages}>{ messagesElements }</div>
        </div>
    )
}

export default Dialogs;