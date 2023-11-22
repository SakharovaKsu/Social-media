import { Dispatch } from 'redux'
import { authAPI, FormType, securityAPI } from '../api/api'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { SetAppErrorType, setAppStatus, SetAppStatusType } from './appReducer'
import { AppDispatchType } from './reduxStore'

export enum RESULT_CODE {
    OK = 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10,
}

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}

type SetUserDataType = ReturnType<typeof setUserData>
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
type SetUserIdType = ReturnType<typeof setUserId>
type GetCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>
type ActionType =
    | SetUserDataType
    | SetIsLoggedInType
    | SetAppErrorType
    | SetAppStatusType
    | SetUserIdType
    | GetCaptchaUrlSuccessType

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
}

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-USER-DATA': {
            return { ...state, ...action.payload.user, isAuth: true }
        }
        case 'AUTH/SET-IS-LOGGED-IN': {
            return { ...state, isAuth: action.isAuth }
        }
        case 'AUTH/SET-USER-ID': {
            return { ...state, id: action.id }
        }
        case 'GET-CAPTCHA-URL': {
            return { ...state, captchaUrl: action.url }
        }
        default:
            return state
    }
}

export const setUserData = (user: InitialStateType) => ({ type: 'AUTH/SET-USER-DATA', payload: { user } }) as const
export const setIsLoggedIn = (isAuth: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', isAuth }) as const
export const setUserId = (id: number) => ({ type: 'AUTH/SET-USER-ID', id }) as const
export const getCaptchaUrlSuccess = (url: string) => ({ type: 'GET-CAPTCHA-URL', url }) as const

export const loginTC = (data: FormType) => async (dispatch: AppDispatchType) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.login(data)

        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(setIsLoggedIn(true))
            dispatch(setUserId(response.data.data.userId))
        } else {
            if (response.data.resultCode === RESULT_CODE.ERROR_CAPTCHA) {
                dispatch(getCaptchaUrl())
            }
            handleServerAppError(response.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError((error as { message: string }).message, dispatch)
    } finally {
        dispatch(setAppStatus('succeeded'))
    }
}

export const logOutTC = () => async (dispatch: Dispatch<ActionType>) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.logOut()
        debugger

        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatus('succeeded'))
        }
    } catch (error) {}
}

export const getCaptchaUrl = () => async (dispatch: Dispatch<ActionType>) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await securityAPI.getCuptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    } catch (error) {}
}
