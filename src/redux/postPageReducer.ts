import {AllActionType} from './state';
import {v1} from 'uuid';

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
export type AllPostActionType =  AddPostActionType | UpdateNewPostTextActionType

export type PostsDataType = {
    id: string
    message: string
    src: string
    likeCount: number
}

export type PostPageType = {
    postsData: PostsDataType[]
    newPostText: string
}

const postPage: PostPageType = {
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

export const postPageReducer = (state = postPage, action: AllActionType ): PostPageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                message: state.newPostText,
                src: ' ',
                likeCount: 0
            }
            state.postsData.push(newPost) // добавляем текст из инпута
            state.newPostText = '' // обнуляем инпут
            return state
        }
        case 'UPDATE-NEW-POST-TEXT': {
            state.newPostText = action.newText
            return state
        }
        default:
            return state
    }
}

export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    } as const
}