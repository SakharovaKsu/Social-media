import { Dispatch } from 'redux'
import { actionsAuth } from './authReducer'
import { authAPI } from '../api/auth.api'
import { RESULT_CODE } from '../enums/enums'
import { BaseThunk, InferAction } from './ActionsType/InferAction'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}

export type ActionsApp = InferAction<typeof actionsApp>
type Thunk = BaseThunk<ActionsApp>

const initialState: InitialStateType = {
    // если ошибка какая-то глобальная произойдёт - запишем текст ошибки сюда
    error: null as string | null,
    // происходит ли сейчас взаимодействие с сервером
    status: 'idle' as RequestStatusType,
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: false,
}

export const appReducer = (state = initialState, action: ActionsApp): InitialStateType => {
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

export const actionsApp = {
    setAppError: (error: string | null) => ({ type: 'APP/SET-APP-ERROR', error }) as const,
    setAppStatus: (status: RequestStatusType) => ({ type: 'APP/SET-APP-STATUS', status }) as const,
    isAppIsInitialized: (isInitialized: boolean) => ({ type: 'APP/SET-IS-INITIALIZED-ERROR', isInitialized }) as const,
}

export const initializeAppTC = (): Thunk => async (dispatch: Dispatch) => {
    try {
        dispatch(actionsApp.setAppStatus('loading'))

        const response = await authAPI.getAuthMe()

        dispatch(actionsApp.setAppStatus('succeeded'))
        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(actionsAuth.setIsLoggedIn(true))
            dispatch(actionsAuth.setUserData(response.data.data))
        }

        dispatch(actionsApp.isAppIsInitialized(true))
    } catch (error) {}
}
