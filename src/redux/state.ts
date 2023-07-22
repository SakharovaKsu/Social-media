import {v1} from 'uuid';

export type DialogsDataType = {
    id: string
    name: string
    src: string
}

export type MessageDataType = {
    id: string
    message: string
}

export type PostsDataType = {
    id: string
    message: string
    src: string
    likeCount: number
}

export type DialogsPageType = {
    dialogsData: DialogsDataType[]
    messageData: MessageDataType[]
    newMessageText: string
}

export type PostPageType = {
    postsData: PostsDataType[]
    newPostText: string
}

export type StateType = {
    dialogsPage: DialogsPageType
    postPage: PostPageType
}

export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: (state: StateType) => void
    subscribe: (observer: (state: StateType) => void) => void
    dispatch: (action: AllActionType) => void
}

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
type AddMessageActionType = ReturnType<typeof addMassageAC>
type UpdateNewMessageTextActionType = ReturnType<typeof updateNewMessageTextAC>

export type AllActionType =  AddPostActionType | UpdateNewPostTextActionType | AddMessageActionType | UpdateNewMessageTextActionType

export const store: StoreType = {
    _state: {
        dialogsPage: {
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
        },

        postPage: {
            postsData: [
                {
                    id: v1(),
                    message: 'Global Travel And Vacations Luxury Travel On A Tight Budget',
                    src: 'https://i.ibb.co/6w8wDCj/MyPost-1.jpg',
                    likeCount: 1000},
                {
                    id: v1(),
                    message: 'A morning bike trip to the mountains is the best rest from the bustle of the city',
                    src: 'https://i.ibb.co/xLPQLDG/MyPost-2.jpg',
                    likeCount: 232},
            ],
            newPostText: ''
        }
    },

    _callSubscriber(state: StateType) {
        console.log('render')
    },

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: v1(),
                message: this._state.postPage.newPostText,
                src: ' ',
                likeCount: 0
            }
            this._state.postPage.postsData.push(newPost) // добавляем текст из инпута
            this._state.postPage.newPostText = '' // обнуляем инпут
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.postPage.newPostText = action.newText
            this._callSubscriber(this._state)
        } else if (action.type === 'ADD-MESSAGE') {
            let newMessage = {
                id: v1(),
                message: this._state.dialogsPage.newMessageText
            }
            this._state.dialogsPage.messageData.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.newText
            this._callSubscriber(this._state)
        }
    }
}

export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    } as const
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

// window.store = store
