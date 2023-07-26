import React, {FC} from 'react';
import {addMassageAC, updateNewMessageTextAC} from '../../redux/dialogsReducer';
import {StoreType} from '../../redux/redux-store';
import Dialogs from './Dialogs';

type DialogsType = {
    store: StoreType
}
const DialogsContainer:FC<DialogsType> = ({store}) => {

    const newStore = store.getState()
    const dialogsData= newStore.dialogsPage.dialogsData
    const messageData= newStore.dialogsPage.messageData
    const newMessageText = newStore.dialogsPage.newMessageText

    const dispatch = store.dispatch.bind(store)

    const addMessages = () => {
        dispatch(addMassageAC())
    }

    const updateNewMessageText = (text: string) => {
        dispatch(updateNewMessageTextAC(text))
    }

    return (
        <Dialogs
            dialogsData={dialogsData}
            messageData={messageData}
            newMessageText={newMessageText}
            addMessagesCallback={addMessages}
            updateNewMessageTextCallback={updateNewMessageText}
        />
    )
}

export default DialogsContainer;