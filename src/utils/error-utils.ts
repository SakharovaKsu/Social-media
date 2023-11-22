import { Dispatch } from 'redux'
import { setAppError, SetAppErrorType } from '../redux/appReducer'

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
    data: T
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError(error))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorType>
