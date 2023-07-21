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

export let state: StateType = {
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
}

export const addPost = () => {
    const newPost = {
        id: v1(),
        message: state.postPage.newPostText,
        src: ' ',
        likeCount: 0
    }
    state.postPage.postsData.push(newPost) // добавляем текст из инпута
    state.postPage.newPostText = '' // обнуляем инпут
    renderEntireTree(state)
}

// новый текст в инпуте
export const updateNewPostText = (newText: string) => {
    state.postPage.newPostText = newText
    renderEntireTree(state)
}

export const addMessage = (massage: string) => {
    let newMessage = {
        id: v1(),
        message: massage
    }
    state.dialogsPage.messageData.push(newMessage)
    renderEntireTree(state)
}

export const subscribe = (observer: (state: StateType)=>void) => {
    renderEntireTree = observer
}
//
// export type StoreType = {
//     _state: StateType
//     _renderEntireTree: () => void
//     addPost: () => void
//     updateNewPostText: (newText: string) => void
//     addMessage: (massage: string) => void
//     subscribe: (observer: () => {}) => void
//     getState: () => StateType
// }
//
// export const store: StoreType = {
//     _state: {
//         dialogsPage: {
//             dialogsData: [
//                 {id: 1, name: 'Terry McDaniel', src: 'https://i.ibb.co/dMWjm0P/user-1.png'},
//                 {id: 2, name: 'Randy Russell', src: 'https://i.ibb.co/8MbKKLQ/user-3.png'},
//                 {id: 3, name: 'Charlotte Peters', src: 'https://i.ibb.co/258YhJH/user-2.png'},
//                 {id: 4, name: 'Pearl Ward', src: 'https://i.ibb.co/FhnF64b/user-5.png'},
//                 {id: 5, name: 'Martha Gross', src: 'https://i.ibb.co/Xp4HMsd/user-4.png'},
//             ],
//
//             messageData: [
//                 {id: 1, message: 'Hello Linh!'},
//                 {id: 2, message: '👋 Hi Gabriel'},
//                 {id: 3, message: 'I really love your work, a great job 💪'},
//                 {id: 4, message: 'Thank you, I also love it.'},
//                 {id: 5, message: 'Good morning ☀️'},
//             ]
//         },
//
//         postPage: {
//             postsData: [
//                 {
//                     id: 1,
//                     message: 'Global Travel And Vacations Luxury Travel On A Tight Budget',
//                     src: 'https://i.ibb.co/6w8wDCj/MyPost-1.jpg',
//                     likeCount: 1000},
//                 {
//                     id: 2,
//                     message: 'A morning bike trip to the mountains is the best rest from the bustle of the city',
//                     src: 'https://i.ibb.co/xLPQLDG/MyPost-2.jpg',
//                     likeCount: 232},
//             ],
//             newPostText: 'That tell interesting'
//         }
//     },
//     _renderEntireTree(state: StateType) {
//         console.log('render')
//     },
//     addPost() {
//         const newPost = {
//             id: 6,
//             message: this._state.postPage.newPostText,
//             src: ' ',
//             likeCount: 0
//         }
//         this._state.postPage.postsData.push(newPost) // добавляем текст из инпута
//         this._state.postPage.newPostText = '' // обнуляем инпут
//         renderEntireTree()
//     },
//     // новый текст в инпуте
//     updateNewPostText(newText: string) {
//         this._state.postPage.newPostText = newText
//         renderEntireTree()
//     },
//     addMessage(massage: string) {
//         let newMessage = {
//             id: 6,
//             message: massage
//         }
//         this._state.dialogsPage.messageData.push(newMessage)
//         renderEntireTree()
//     },
//     subscribe(observer) {
//         this._renderEntireTree = observer
//     },
//     getState() {
//         return this._state
//     }
// }

// window.store = store
