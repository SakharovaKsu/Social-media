import { Dispatch } from 'redux'
import { FormType } from '../api/api.type'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { actionsApp, ActionsApp, Thunk } from './appReducer'
import { AppDispatchType } from './store'
import { authAPI } from '../api/auth.api'
import { securityAPI } from '../api/security.api'
import { RESULT_CODE } from '../enums/enums'
import { InferAction } from './ActionsType/InferAction'

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}

type ActionsAuth = InferAction<typeof actionsAuth>
type AllAction = ActionsAuth | ActionsApp

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
}

export const authReducer = (state = initialState, action: ActionsAuth): InitialStateType => {
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

export const actionsAuth = {
    setUserData: (user: InitialStateType) => ({ type: 'AUTH/SET-USER-DATA', payload: { user } }) as const,
    setIsLoggedIn: (isAuth: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', isAuth }) as const,
    setUserId: (id: number) => ({ type: 'AUTH/SET-USER-ID', id }) as const,
    getCaptchaUrlSuccess: (url: string) => ({ type: 'GET-CAPTCHA-URL', url }) as const,
}

export const loginTC =
    (data: FormType): Thunk =>
    async (dispatch: AppDispatchType) => {
        try {
            dispatch(actionsApp.setAppStatus('loading'))
            const response = await authAPI.login(data)

            if (response.data.resultCode === RESULT_CODE.OK) {
                dispatch(actionsAuth.setIsLoggedIn(true))
                dispatch(actionsAuth.setUserId(response.data.data.userId))
            } else {
                if (response.data.resultCode === RESULT_CODE.ERROR_CAPTCHA) {
                    dispatch(getCaptchaUrl())
                }
                handleServerAppError(response.data, dispatch)
            }
        } catch (error) {
            handleServerNetworkError((error as { message: string }).message, dispatch)
        } finally {
            dispatch(actionsApp.setAppStatus('succeeded'))
        }
    }

export const logOutTC = (): Thunk => async (dispatch: Dispatch<AllAction>) => {
    try {
        dispatch(actionsApp.setAppStatus('loading'))
        const response = await authAPI.logOut()
        debugger

        if (response.data.resultCode === RESULT_CODE.OK) {
            dispatch(actionsAuth.setIsLoggedIn(false))
            dispatch(actionsApp.setAppStatus('succeeded'))
        }
    } catch (error) {}
}

export const getCaptchaUrl = (): Thunk => async (dispatch: Dispatch<AllAction>) => {
    try {
        dispatch(actionsApp.setAppStatus('loading'))
        const response = await securityAPI.getCuptchaUrl()
        const captchaUrl = response.data.url
        dispatch(actionsAuth.getCaptchaUrlSuccess(captchaUrl))
    } catch (error) {}
}
