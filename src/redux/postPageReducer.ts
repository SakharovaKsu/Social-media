import {AllActionType, StateType} from './state';
import {v1} from 'uuid';

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
export type AllPostActionType =  AddPostActionType | UpdateNewPostTextActionType


export const postPageReducer = (state: StateType, action: AllActionType ): StateType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                message: state.postPage.newPostText,
                src: ' ',
                likeCount: 0
            }
            state.postPage.postsData.push(newPost) // добавляем текст из инпута
            state.postPage.newPostText = '' // обнуляем инпут
            return state
        }
        case 'UPDATE-NEW-POST-TEXT': {
            state.postPage.newPostText = action.newText
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