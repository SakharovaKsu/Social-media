import React, {FC} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem /DialogItem';
import Message from './Message/Message';
import TextArea from './TextArea/TextArea';
import { DialogsPageType} from '../../redux/dialogsReducer';
import {Redirect} from 'react-router-dom';

type DialogsType = {
    dialogsPage: DialogsPageType
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => void
    isAuth: boolean
}

const Dialogs:FC<DialogsType> = ({dialogsPage, addMessagesCallback, updateNewMessageTextCallback, isAuth}) => {

    const dialogsElements = dialogsPage.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} src={dialog.src}/>);

    const messagesElements = dialogsPage.messageData.map(message => <Message key={message.id} message={message.message} id={message.id}/>)

    // Если мы не залогинены, то перенаправит на др. страницу
    if(!isAuth) return <Redirect to={'./login'}/>

    return (
        <div className={s.dialogs}>
            <h2 className={s.title}>Chats</h2>
            <div className={s.box}>
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
        </div>
    )
}

export default Dialogs;