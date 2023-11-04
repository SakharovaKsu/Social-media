import { AllActionType } from './state'
import { v1 } from 'uuid'
import { Dispatch } from 'redux'
import { profileAPI } from '../api/api'
import { RESULT_CODE } from './authReducer'

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
type setUserProfileType = ReturnType<typeof setUserProfileAC>
type SetStatusType = ReturnType<typeof setStatusAC>
type UpdateStatusType = ReturnType<typeof updateStatusAC>
type SavePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
type SaveProfileType = ReturnType<typeof saveProfileAC>
export type AllPostActionType =
    | AddPostActionType
    | UpdateNewPostTextActionType
    | setUserProfileType
    | SetStatusType
    | UpdateStatusType
    | SavePhotoSuccessType
    | SaveProfileType

export type PostsDataType = {
    id: string
    message: string
    src: string
    likeCount: number
}

export type ContactsType = {
    facebook: string | null
    github: string | null
    website: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    vk: string | null
    mainLink: string | null
}

export type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number | null
}

export type PostPageType = {
    postsData: PostsDataType[]
    newPostText: string
    profile: ProfileType
    photos: PhotosType
    status: string
}

const postPage: PostPageType = {
    postsData: [
        {
            id: v1(),
            message: 'Global Travel And Vacations Luxury Travel On A Tight Budget',
            src: 'https://i.ibb.co/6w8wDCj/MyPost-1.jpg',
            likeCount: 1000,
        },
        {
            id: v1(),
            message: 'A morning bike trip to the mountains is the best rest from the bustle of the city',
            src: 'https://i.ibb.co/xLPQLDG/MyPost-2.jpg',
            likeCount: 232,
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
        userId: null,
    },
    photos: {
        small: '',
        large: '',
    },
    status: '',
}

export const postPageReducer = (state = postPage, action: AllActionType): PostPageType => {
    switch (action.type) {
        case 'POST-PAGE/ADD-POST': {
            const newPost = {
                id: v1(),
                message: state.newPostText,
                src: ' ',
                likeCount: 0,
            }
            state.newPostText = '' // обнуляем инпут
            return { ...state, postsData: [...state.postsData, newPost] }
        }
        case 'POST-PAGE/UPDATE-NEW-POST-TEXT': {
            return { ...state, newPostText: action.payload.text }
        }
        case 'POST-PAGE/SET-USER-PROFILE': {
            return { ...state, profile: action.payload.profile }
        }
        case 'POST-PAGE/SET-STATUS': {
            return { ...state, status: action.payload.status }
        }
        case 'POST-PAGE/UPDATE-STATUS': {
            return { ...state, status: action.payload.status }
        }
        case 'SAVE-PHOTO-SUCCESS': {
            return { ...state, photos: action.payload.photos }
        }
        case 'SAVE-PROFILE': {
            return { ...state, profile: action.payload.profile }
        }
        default:
            return state
    }
}

export const addPostAC = () => ({ type: 'POST-PAGE/ADD-POST' }) as const
export const updateNewPostTextAC = (text: string) =>
    ({ type: 'POST-PAGE/UPDATE-NEW-POST-TEXT', payload: { text } }) as const
export const setUserProfileAC = (profile: ProfileType) =>
    ({ type: 'POST-PAGE/SET-USER-PROFILE', payload: { profile } }) as const
export const setStatusAC = (status: string) => ({ type: 'POST-PAGE/SET-STATUS', payload: { status } }) as const
export const updateStatusAC = (status: string) => ({ type: 'POST-PAGE/UPDATE-STATUS', payload: { status } }) as const
export const savePhotoSuccess = (photos: PhotosType) => ({ type: 'SAVE-PHOTO-SUCCESS', payload: { photos } }) as const
export const saveProfileAC = (profile: any) => ({ type: 'SAVE-PROFILE', payload: { profile } }) as const

export const getProfileTC = (userId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC(response.payload.profile))
    } catch (error) {
        // Обработка ошибок, если необходимо
    }
}

export const getStatusTC = (userId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.getUserStatus(userId)
        dispatch(setStatusAC(response.data))
    } catch (error) {
        // Обработка ошибок, если необходимо
    }
}

export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(updateStatusAC(status))
        }
    } catch (error) {
        // Обработка ошибок, если необходимо
    }
}

export const savePhotoTC = (photos: File) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(photos)
    console.log(response)
    if (response.data.resultCode === RESULT_CODE.OK) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileTC = (profile: ProfileType) => async (dispatch: Dispatch) => {
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === RESULT_CODE.OK) {
        dispatch(saveProfileAC(response.data.data.profile))
    }
}
