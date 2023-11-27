import React, { FC } from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem /DialogItem'
import Message from './Message/Message'
import TextArea from './TextArea/TextArea'
import { DialogsPageType } from '../../common/redux/dialogsReducer'

type DialogsType = {
    dialogsPage: DialogsPageType
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => void
}

const Dialogs: FC<DialogsType> = React.memo(({ dialogsPage, addMessagesCallback, updateNewMessageTextCallback }) => {
    const dialogsElements = dialogsPage.dialogsData.map((dialog) => (
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} src={dialog.src} />
    ))

    const messagesElements = dialogsPage.messageData.map((message) => (
        <Message key={message.id} message={message.message} id={message.id} />
    ))

    return (
        <div className={s.dialogs}>
            <h2 className={s.title}>Chats</h2>
            <div className={s.box}>
                <ul className={s.list}>{dialogsElements}</ul>
                <div className={s.containerMessage}>
                    <div className={s.messagesList}>{messagesElements}</div>
                    <TextArea
                        name={'Send'}
                        addTextCallback={addMessagesCallback}
                        placeholder={'Type your message'}
                        updateTextCallback={updateNewMessageTextCallback}
                    />
                </div>
            </div>
        </div>
    )
})

export default Dialogs
