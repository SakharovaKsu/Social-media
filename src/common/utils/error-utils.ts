import { Dispatch } from 'redux'
import { ActionsApp, actionsApp } from '../redux/appReducer'

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
    data: T
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(actionsApp.setAppError(data.messages[0]))
    } else {
        dispatch(actionsApp.setAppError('Some error occurred'))
    }
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(actionsApp.setAppError(error))
}

type ErrorUtilsDispatchType = Dispatch<ActionsApp>
