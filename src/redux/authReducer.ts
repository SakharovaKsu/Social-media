import {Dispatch} from 'redux';
import {authAPI, FormType} from '../api/api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from './appReducer';

export enum RESULT_CODE {
    OK = 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10
}

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
};

type SetUserDataType = ReturnType<typeof setUserDataAC>;
type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type ActionType = SetUserDataType | SetIsLoggedInType | SetAppErrorType | SetAppStatusType

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA': {
            return {...state, ...action.payload.user, isAuth: true};
        }
        case 'login/SET-IS-LOGGED-IN': {
            return {...state, isAuth: action.isAuth}
        }
        default:
            return state;
    }
}

export const setUserDataAC = (user: InitialStateType) => ({type: 'SET-USER-DATA', payload: {user}} as const)
export const setIsLoggedInAC = (isAuth: boolean) => ({type: 'login/SET-IS-LOGGED-IN', isAuth} as const)

export const loginTC = (data: FormType) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(response => {
            if(response.data.resultCode === RESULT_CODE.OK) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError((e as {message: string}).message, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(response => {
            if(response.data.resultCode === RESULT_CODE.OK) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
}