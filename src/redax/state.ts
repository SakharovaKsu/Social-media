export type dialogsDataType = {
    id: number
    name: string
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
            {id: 1, name: 'Dima'},
            {id: 2, name: 'Valera'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Olga'},
            {id: 5, name: 'Paul'},
        ],

        messageData: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'Buddy, how are you? How are you?'},
            {id: 3, message: 'Everything is just great!'},
            {id: 4, message: 'Lol'},
            {id: 5, message: 'Yes =)'},
        ]
    },

    postPage: {
        postsData: [
            {id: 1, message: 'Hi', likeCount: 4},
            {id: 2, message: 'Good', likeCount: 22},
        ]
    }
}