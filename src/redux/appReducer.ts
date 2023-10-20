import {Dispatch} from 'redux';
import {authAPI} from '../api/api';
import {RESULT_CODE, setIsLoggedInAC, setUserDataAC} from './authReducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
};

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
        case 'SET-APP-ERROR': {
            return {...state, error: action.error}
        }
        case 'SET-APP-STATUS': {
            return {...state, status: action.status}
        }
        case 'SET-IS-INITIALIZED-ERROR': {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state;
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'SET-APP-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)
export const isAppIsInitializedAC = (isInitialized: boolean) => ({type: 'SET-IS-INITIALIZED-ERROR', isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.getAuthMe()
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setUserDataAC(res.data.data))
            }

            dispatch(isAppIsInitializedAC(true ))
    })
}
