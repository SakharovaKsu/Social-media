import {v1} from 'uuid';
import {AllActionType} from './state';

type AddMessageActionType = ReturnType<typeof addMassageAC>
type UpdateNewMessageTextActionType = ReturnType<typeof updateNewMessageTextAC>

export type AllDialogsActionType =  AddMessageActionType | UpdateNewMessageTextActionType

export type DialogsDataType = {
    id: string
    name: string
    src: string
}

export type MessageDataType = {
    id: string
    message: string
}

export type DialogsPageType = {
    dialogsData: DialogsDataType[]
    messageData: MessageDataType[]
    newMessageText: string
}

const dialogsPage: DialogsPageType = {
    dialogsData: [
        {id: v1(), name: 'Terry McDaniel', src: 'https://i.ibb.co/dMWjm0P/user-1.png'},
        {id: v1(), name: 'Randy Russell', src: 'https://i.ibb.co/8MbKKLQ/user-3.png'},
        {id: v1(), name: 'Charlotte Peters', src: 'https://i.ibb.co/258YhJH/user-2.png'},
        {id: v1(), name: 'Pearl Ward', src: 'https://i.ibb.co/FhnF64b/user-5.png'},
        {id: v1(), name: 'Martha Gross', src: 'https://i.ibb.co/Xp4HMsd/user-4.png'},
    ],
    messageData: [
        {id: v1(), message: 'Hello Linh!'},
        {id: v1(), message: '👋 Hi Gabriel'},
        {id: v1(), message: 'I really love your work, a great job 💪'},
        {id: v1(), message: 'Thank you, I also love it.'},
        {id: v1(), message: 'Good morning ☀️'},
    ],
        newMessageText: ''
}

export const dialogsReducer = (state = dialogsPage, action: AllActionType ): DialogsPageType => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
            let newMessage = {
                id: v1(),
                message: state.newMessageText
            }
            state.newMessageText = ''
            return {...state, messageData: [...state.messageData, newMessage]}
        }
        case 'UPDATE-NEW-MESSAGE-TEXT': {
            return {...state, newMessageText: action.payload.text}
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
        payload: {text}
    } as const
}