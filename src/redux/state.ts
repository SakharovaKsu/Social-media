import {v1} from 'uuid';

let renderEntireTree = (state: StateType) => {
    console.log('render')
}

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
}

export type PostPageType = {
    postsData: PostsDataType[]
    newPostText: string
}

export type StateType = {
    dialogsPage: DialogsPageType
    postPage: PostPageType
}

export type AddPropsType = {
    state: StateType
    addPosts: (postMassage: string) => void
}

// export let state: StateType = {
//     dialogsPage: {
//         dialogsData: [
//             {id: v1(), name: 'Terry McDaniel', src: 'https://i.ibb.co/dMWjm0P/user-1.png'},
//             {id: v1(), name: 'Randy Russell', src: 'https://i.ibb.co/8MbKKLQ/user-3.png'},
//             {id: v1(), name: 'Charlotte Peters', src: 'https://i.ibb.co/258YhJH/user-2.png'},
//             {id: v1(), name: 'Pearl Ward', src: 'https://i.ibb.co/FhnF64b/user-5.png'},
//             {id: v1(), name: 'Martha Gross', src: 'https://i.ibb.co/Xp4HMsd/user-4.png'},
//         ],
//
//         messageData: [
//             {id: v1(), message: 'Hello Linh!'},
//             {id: v1(), message: '👋 Hi Gabriel'},
//             {id: v1(), message: 'I really love your work, a great job 💪'},
//             {id: v1(), message: 'Thank you, I also love it.'},
//             {id: v1(), message: 'Good morning ☀️'},
//         ]
//     },
//
//     postPage: {
//         postsData: [
//             {
//                 id: v1(),
//                 message: 'Global Travel And Vacations Luxury Travel On A Tight Budget',
//                 src: 'https://i.ibb.co/6w8wDCj/MyPost-1.jpg',
//                 likeCount: 1000},
//             {
//                 id: v1(),
//                 message: 'A morning bike trip to the mountains is the best rest from the bustle of the city',
//                 src: 'https://i.ibb.co/xLPQLDG/MyPost-2.jpg',
//                 likeCount: 232},
//         ],
//         newPostText: 'That tell interesting'
//     }
// }
//
// export const addPost = () => {
//     const newPost = {
//         id: v1(),
//         message: state.postPage.newPostText,
//         src: ' ',
//         likeCount: 0
//     }
//     state.postPage.postsData.push(newPost) // добавляем текст из инпута
//     state.postPage.newPostText = '' // обнуляем инпут
//     renderEntireTree(state)
// }
//
// // новый текст в инпуте
// export const updateNewPostText = (newText: string) => {
//     state.postPage.newPostText = newText
//     renderEntireTree(state)
// }
//
// export const addMessage = (massage: string) => {
//     let newMessage = {
//         id: v1(),
//         message: massage
//     }
//     state.dialogsPage.messageData.push(newMessage)
//     renderEntireTree(state)
// }
//
// export const subscribe = (observer: (state: StateType)=>void) => {
//     renderEntireTree = observer
// }

export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: (state: StateType) => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
    addMessage: (massage: string) => void
    subscribe: (observer: (state: StateType) => void) => void
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
            ]
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
            newPostText: 'That tell interesting'
        }
    },

    _callSubscriber(state: StateType) {
        console.log('render')
    },

    getState() {
        return this._state
    },

    addPost() {
        const newPost = {
            id: v1(),
            message: this._state.postPage.newPostText,
            src: ' ',
            likeCount: 0
        }
        this._state.postPage.postsData.push(newPost) // добавляем текст из инпута
        this._state.postPage.newPostText = '' // обнуляем инпут
        this._callSubscriber(this._state)
    },

    // новый текст в инпуте
    updateNewPostText(newText: string) {
        this._state.postPage.newPostText = newText
        this._callSubscriber(this._state)
    },

    addMessage(massage: string) {
        let newMessage = {
            id: v1(),
            message: massage
        }
        this._state.dialogsPage.messageData.push(newMessage)
        this._callSubscriber(this._state)
    },

    subscribe(observer) {
        this._callSubscriber = observer
    }
}

// window.store = store
