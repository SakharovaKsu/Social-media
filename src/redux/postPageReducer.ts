import {AllActionType} from './state';
import {v1} from 'uuid';
import {Dispatch} from 'redux';
import {userAPI} from '../api/api';

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
type setUserProfileType = ReturnType<typeof setUserProfileAC>
export type AllPostActionType =  AddPostActionType | UpdateNewPostTextActionType | setUserProfileType

export type PostsDataType = {
    id: string
    message: string
    src: string
    likeCount: number
}

type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

export type PostPageType = {
    postsData: PostsDataType[]
    newPostText: string
    profile: ProfileType
}

const postPage: PostPageType = {
    postsData: [
        {
            id: v1(),
            message: 'Global Travel And Vacations Luxury Travel On A Tight Budget',
            src: 'https://i.ibb.co/6w8wDCj/MyPost-1.jpg',
            likeCount: 1000
        },
        {
            id: v1(),
            message: 'A morning bike trip to the mountains is the best rest from the bustle of the city',
            src: 'https://i.ibb.co/xLPQLDG/MyPost-2.jpg',
            likeCount: 232
        },
    ],
    newPostText: '',
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: true,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 2,
        photos: {
            small: '',
            large: ''
        }
    }
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
            state.newPostText = '' // обнуляем инпут
            return {...state, postsData: [...state.postsData, newPost]}
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.payload.text}
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.payload.profile}
        }
        default:
            return state
    }
}

export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const updateNewPostTextAC = (text: string) => ({type: 'UPDATE-NEW-POST-TEXT', payload: {text}} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: 'SET-USER-PROFILE', payload: {profile}} as const)

export const getProfileTC = (userId: string) => {

    return (dispatch: Dispatch) => {

        userAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.payload.profile))
            })
    }
}