export type dialogsDataType = {
    id: number
    name: string
    src: string
}

type  messageDataType = {
    id: number
    message: string
}

export type PostsDataType = {
    id: number
    message: string
    likeCount: number
}

export type DialogsPageType = {
    dialogsData: dialogsDataType[]
    messageData: messageDataType[]
}

export type PostPageType = {
    postsData: PostsDataType[]
}

export type StateType = {
    dialogsPage: DialogsPageType
    postPage: PostPageType
}

export let state: StateType = {
    dialogsPage: {
        dialogsData: [
            {id: 1, name: 'Terry McDaniel', src: 'https://i.ibb.co/dMWjm0P/user-1.png'},
            {id: 2, name: 'Randy Russell', src: 'https://i.ibb.co/8MbKKLQ/user-3.png'},
            {id: 3, name: 'Charlotte Peters', src: 'https://i.ibb.co/258YhJH/user-2.png'},
            {id: 4, name: 'Pearl Ward', src: 'https://i.ibb.co/FhnF64b/user-5.png'},
            {id: 5, name: 'Martha Gross', src: 'https://i.ibb.co/Xp4HMsd/user-4.png'},
        ],

        messageData: [
            {id: 1, message: 'Hello Linh!'},
            {id: 2, message: '👋 Hi Gabriel'},
            {id: 3, message: 'I really love your work, a great job 💪'},
            {id: 4, message: 'Thank you, I also love it.'},
            {id: 5, message: 'Good morning ☀️'},
        ]
    },

    postPage: {
        postsData: [
            {id: 1, message: 'Hi', likeCount: 4},
            {id: 2, message: 'Good', likeCount: 22},
        ]
    }
}