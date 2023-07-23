import {v1} from 'uuid';
import {AllPostActionType, postPageReducer} from './postPageReducer';
import {AllDialogsActionType, dialogsReducer} from './dialogsReducer';


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

export type AllActionType =  AllDialogsActionType | AllPostActionType

export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: (state: StateType) => void
    subscribe: (observer: (state: StateType) => void) => void
    dispatch: (action: AllActionType) => void
}

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
        this._state.postPage = postPageReducer(this._state.postPage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}

// window.store = store
