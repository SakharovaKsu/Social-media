import React, {FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem /DialogItem';
import Message from './Message/Message';
import TextArea from './TextArea/TextArea';
import { DialogsPageType} from '../../redux/dialogsReducer';

type DialogsType = {
    dialogsPage: DialogsPageType
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => void
}

const Dialogs:FC<DialogsType> = ({dialogsPage, addMessagesCallback, updateNewMessageTextCallback}) => {
    console.log(dialogsPage)
    const dialogsElements = dialogsPage.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} src={dialog.src}/>);

    const messagesElements = dialogsPage.messageData.map(message => <Message key={message.id} message={message.message} id={message.id}/>)

    return (
        <div className={s.dialogs}>
            <ul className={s.list}>{ dialogsElements }</ul>
            <div>
                <div className={s.messagesList}>{ messagesElements }</div>
                <TextArea
                    name={'Send'}
                    newMessageText={dialogsPage.newMessageText}
                    addMessagesCallback={addMessagesCallback}
                    updateNewMessageTextCallback={updateNewMessageTextCallback}
                />
            </div>
        </div>
    )
}

export default Dialogs;