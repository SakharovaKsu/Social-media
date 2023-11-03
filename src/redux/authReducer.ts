import { Dispatch } from 'redux'
import { authAPI, FormType } from '../api/api'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { SetAppErrorType, setAppStatusAC, SetAppStatusType } from './appReducer'

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
}

type SetUserDataType = ReturnType<typeof setUserDataAC>
type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type SetUserIdType = ReturnType<typeof setUserIdAC>
type ActionType = SetUserDataType | SetIsLoggedInType | SetAppErrorType | SetAppStatusType | SetUserIdType

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
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
        default:
            return state
    }
}

export const setUserDataAC = (user: InitialStateType) => ({ type: 'AUTH/SET-USER-DATA', payload: { user } }) as const
export const setIsLoggedInAC = (isAuth: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', isAuth }) as const
export const setUserIdAC = (id: number) => ({ type: 'AUTH/SET-USER-ID', id }) as const

export const loginTC = (data: FormType) => async (dispatch: Dispatch<ActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await authAPI.login(data)

        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setUserIdAC(response.data.data.userId))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError((error as { message: string }).message, dispatch)
    }
}

export const logOutTC = () => async (dispatch: Dispatch<ActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await authAPI.logOut()

        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        }
    } catch (error) {}
}
