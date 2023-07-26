import React, {FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem /DialogItem';
import Message from './Message/Message';
import TextArea from './TextArea/TextArea';
import {DialogsDataType, MessageDataType} from '../../redux/dialogsReducer';

type DialogsType = {
    dialogsData: DialogsDataType[]
    messageData: MessageDataType[]
    newMessageText: string
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => void
}

const Dialogs:FC<DialogsType> = ({dialogsData, messageData, newMessageText, addMessagesCallback, updateNewMessageTextCallback}) => {

    const dialogsElements = dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} src={dialog.src}/>);

    const messagesElements = messageData.map(message => <Message key={message.id} message={message.message} id={message.id}/>)

    return (
        <div className={s.dialogs}>
            <ul className={s.list}>{ dialogsElements }</ul>
            <div>
                <div className={s.messagesList}>{ messagesElements }</div>
                <TextArea
                    name={'Send'}
                    newMessageText={newMessageText}
                    addMessagesCallback={addMessagesCallback}
                    updateNewMessageTextCallback={updateNewMessageTextCallback}
                />
            </div>
        </div>
    )
}

export default Dialogs;