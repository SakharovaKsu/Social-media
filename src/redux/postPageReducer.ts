import {AllActionType} from './state';
import {v1} from 'uuid';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
type setUserProfileType = ReturnType<typeof setUserProfileAC>
type SetStatusType = ReturnType<typeof setStatusAC>
type UpdateStatusType = ReturnType<typeof updateStatusAC>
export type AllPostActionType =  AddPostActionType | UpdateNewPostTextActionType | setUserProfileType | SetStatusType | UpdateStatusType

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
    status: string
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
    },
    status: '',
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
        case 'SET-STATUS': {
            return {...state, status: action.payload.status}
        }
        case 'UPDATE-STATUS': {
            return {...state, status: action.payload.status}
        }
        default:
            return state
    }
}

export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const updateNewPostTextAC = (text: string) => ({type: 'UPDATE-NEW-POST-TEXT', payload: {text}} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: 'SET-USER-PROFILE', payload: {profile}} as const)
export const setStatusAC = (status: string) => ({type: 'SET-STATUS', payload: {status}} as const)
export const updateStatusAC = (status: string) => ({type: 'UPDATE-STATUS', payload: {status}} as const)

export const getProfileTC = (userId: string) => {

    return (dispatch: Dispatch) => {

        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.payload.profile))
            })
    }
}

export const getStatusTC = (userId: string) => (dispatch: Dispatch) => {
    return profileAPI.getUserStatus(userId)
        .then((res) => {
            dispatch(setStatusAC(res.data))
            console.log(res)
        })
}

export const updateStatusTC = (status: string) => (dispatch: Dispatch) => {
    return profileAPI.updateStatus(status)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(updateStatusAC(status))
            }
        })
}