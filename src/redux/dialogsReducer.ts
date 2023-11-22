import { v1 } from 'uuid'
import user1 from '../images/avatar-user/user-1.svg'
import user2 from '../images/avatar-user/user-2.svg'
import user3 from '../images/avatar-user/user-3.svg'
import user4 from '../images/avatar-user/user-4.svg'
import user5 from '../images/avatar-user/user-5.svg'

type AddMessageActionType = ReturnType<typeof addMassage>
type UpdateNewMessageTextActionType = ReturnType<typeof updateNewMessageText>

export type AllDialogsActionType = AddMessageActionType | UpdateNewMessageTextActionType

export type DialogsDataType = {
    id: string
    name: string
    src: any
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
        { id: v1(), name: 'Terry McDaniel', src: user1 },
        { id: v1(), name: 'Randy Russell', src: user3 },
        { id: v1(), name: 'Charlotte Peters', src: user2 },
        { id: v1(), name: 'Pearl Ward', src: user5 },
        { id: v1(), name: 'Martha Gross', src: user4 },
    ],
    messageData: [
        { id: v1(), message: 'Hello Linh!' },
        { id: v1(), message: '👋 Hi Gabriel' },
        { id: v1(), message: 'I really love your work, a great job 💪' },
        { id: v1(), message: 'Thank you, I also love it.' },
        { id: v1(), message: 'Good morning ☀️' },
    ],
    newMessageText: '',
}

export const dialogsReducer = (state = dialogsPage, action: AllDialogsActionType): DialogsPageType => {
    switch (action.type) {
        case 'DIALOGS/ADD-MESSAGE': {
            let newMessage = {
                id: v1(),
                message: state.newMessageText,
            }
            state.newMessageText = ''
            return { ...state, messageData: [...state.messageData, newMessage] }
        }
        case 'DIALOGS/UPDATE-NEW-MESSAGE-TEXT': {
            return { ...state, newMessageText: action.payload.text }
        }
        default:
            return state
    }
}

export const addMassage = () => ({ type: 'DIALOGS/ADD-MESSAGE' }) as const
export const updateNewMessageText = (text: string) =>
    ({ type: 'DIALOGS/UPDATE-NEW-MESSAGE-TEXT', payload: { text } }) as const
