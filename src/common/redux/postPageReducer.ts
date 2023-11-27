import { v1 } from 'uuid'
import { Dispatch } from 'redux'
import { AppDispatchType, StoreType } from './store'
import { setAppError, Thunk } from './appReducer'
import { profileAPI } from '../api/profile.api'
import { RESULT_CODE } from '../enums/enums'

type AddPostActionType = ReturnType<typeof addPost>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostText>
type setUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>
type UpdateStatusType = ReturnType<typeof updateStatus>
type SavePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
type SaveProfileType = ReturnType<typeof saveProfile>
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
    photos: PhotosType
    userId: number | null
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
        photos: {
            small: '',
            large: '',
        },
        userId: null,
    },
    status: '',
}

export const postPageReducer = (state = postPage, action: AllPostActionType): PostPageType => {
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
            return { ...state, profile: { ...state.profile, photos: action.payload.photos } }
        }
        case 'SAVE-PROFILE': {
            return { ...state, profile: action.payload.profile }
        }
        default:
            return state
    }
}

export const addPost = () => ({ type: 'POST-PAGE/ADD-POST' }) as const
export const updateNewPostText = (text: string) =>
    ({ type: 'POST-PAGE/UPDATE-NEW-POST-TEXT', payload: { text } }) as const
export const setUserProfile = (profile: ProfileType) =>
    ({ type: 'POST-PAGE/SET-USER-PROFILE', payload: { profile } }) as const
export const setStatus = (status: string) => ({ type: 'POST-PAGE/SET-STATUS', payload: { status } }) as const
export const updateStatus = (status: string) => ({ type: 'POST-PAGE/UPDATE-STATUS', payload: { status } }) as const
export const savePhotoSuccess = (photos: PhotosType) => ({ type: 'SAVE-PHOTO-SUCCESS', payload: { photos } }) as const
export const saveProfile = (profile: ProfileType) => ({ type: 'SAVE-PROFILE', payload: { profile } }) as const

export const getProfileTC =
    (userId: string): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            const response = await profileAPI.getProfile(userId)
            dispatch(setUserProfile(response.payload.profile))
        } catch (error) {
            // Обработка ошибок, если необходимо
        }
    }

export const getStatusTC =
    (userId: string): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            const response = await profileAPI.getUserStatus(userId)
            dispatch(setStatus(response.data))
        } catch (error) {
            // Обработка ошибок, если необходимо
        }
    }

export const updateStatusTC =
    (status: string): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === RESULT_CODE.OK) {
                dispatch(updateStatus(status))
            }
        } catch (error) {
            // Обработка ошибок, если необходимо
        }
    }

export const savePhotoTC =
    (photos: File): Thunk =>
    async (dispatch: Dispatch) => {
        const response = await profileAPI.savePhoto(photos)
        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }

export const saveProfileTC =
    (profile: Omit<ProfileType, 'photos'>): Thunk =>
    async (dispatch: AppDispatchType, getState: () => StoreType) => {
        const idUser = getState().auth.id
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(setAppError(null))
            idUser && dispatch(getProfileTC(idUser.toString()))
        } else if (response.data.resultCode === RESULT_CODE.ERROR) {
            dispatch(setAppError(response.data?.messages[0]))
        }
    }
