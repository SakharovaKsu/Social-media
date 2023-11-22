import { Dispatch } from 'redux'
import { authAPI } from '../api/api'
import { RESULT_CODE, setIsLoggedIn, setUserData } from './authReducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}

export type SetAppErrorType = ReturnType<typeof setAppError>
export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppIsInitializedType = ReturnType<typeof isAppIsInitialized>
type ActionType = SetAppErrorType | SetAppStatusType | SetAppIsInitializedType

const initialState: InitialStateType = {
    // если ошибка какая-то глобальная произойдёт - запишем текст ошибки сюда
    error: null as string | null,
    // происходит ли сейчас взаимодействие с сервером
    status: 'idle' as RequestStatusType,
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: false,
}

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-ERROR': {
            return { ...state, error: action.error }
        }
        case 'APP/SET-APP-STATUS': {
            return { ...state, status: action.status }
        }
        case 'APP/SET-IS-INITIALIZED-ERROR': {
            return { ...state, isInitialized: action.isInitialized }
        }
        default:
            return state
    }
}

export const setAppError = (error: string | null) => ({ type: 'APP/SET-APP-ERROR', error }) as const
export const setAppStatus = (status: RequestStatusType) => ({ type: 'APP/SET-APP-STATUS', status }) as const
export const isAppIsInitialized = (isInitialized: boolean) =>
    ({ type: 'APP/SET-IS-INITIALIZED-ERROR', isInitialized }) as const

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))

        const response = await authAPI.getAuthMe()

        dispatch(setAppStatus('succeeded'))
        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(setIsLoggedIn(true))
            dispatch(setUserData(response.data.data))
        }

        dispatch(isAppIsInitialized(true))
    } catch (error) {}
}
