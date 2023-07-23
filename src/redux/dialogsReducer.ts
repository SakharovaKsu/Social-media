import {v1} from 'uuid';
import {StateType} from './state';

type AddMessageActionType = ReturnType<typeof addMassageAC>
type UpdateNewMessageTextActionType = ReturnType<typeof updateNewMessageTextAC>

export type AllDialogsActionType =  AddMessageActionType | UpdateNewMessageTextActionType

export const dialogsReducer = (state: StateType, action: AllDialogsActionType ): StateType => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
            let newMessage = {
                id: v1(),
                message: state.dialogsPage.newMessageText
            }
            state.dialogsPage.messageData.push(newMessage)
            state.dialogsPage.newMessageText = ''
            return state
        }
        case 'UPDATE-NEW-MESSAGE-TEXT': {
            state.dialogsPage.newMessageText = action.newText
            return state
        }
        default:
            return state
    }
}

export const addMassageAC = () => {
    return {
        type: 'ADD-MESSAGE'
    } as const
}
export const updateNewMessageTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        newText: text
    } as const
}