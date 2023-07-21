import React, {FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem /DialogItem";
import Message from "./Message/Message";
import {AllActionType, DialogsDataType, MessageDataType, store} from '../../redux/state';
import TextArea from "./TextArea/TextArea";


type DialogsType = {
    messageData: MessageDataType[]
    dialogsData: DialogsDataType[]
    dispatch: (action: AllActionType) => void
}
const Dialogs:FC<DialogsType> = ({messageData, dialogsData,
                                 dispatch}) => {

    const dialogsElements = dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} src={dialog.src}/>);


    const messagesElements = messageData.map(message => <Message key={message.id} message={message.message} id={message.id}/>)

    return (
        <div className={s.dialogs}>
            <ul className={s.list}>{ dialogsElements }</ul>
            <div>
                <div className={s.messagesList}>{ messagesElements }</div>
                <TextArea name={'Send'}
                          dispatch={dispatch}
                />
            </div>
        </div>
    )
}

export default Dialogs;