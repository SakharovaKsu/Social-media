import { Dispatch } from 'redux'
import { authAPI } from '../api/api'
import { RESULT_CODE, setIsLoggedInAC, setUserDataAC } from './authReducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedType = ReturnType<typeof isAppIsInitializedAC>
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

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-APP-ERROR', error }) as const
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-APP-STATUS', status }) as const
export const isAppIsInitializedAC = (isInitialized: boolean) =>
    ({ type: 'APP/SET-IS-INITIALIZED-ERROR', isInitialized }) as const

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))

        const response = await authAPI.getAuthMe()

        dispatch(setAppStatusAC('succeeded'))
        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(response.data.data))
        }

        dispatch(isAppIsInitializedAC(true))
    } catch (error) {}
}
