import { Dispatch } from 'redux'
import {setAppErrorAC, SetAppErrorType} from '../redux/appReducer';


type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors?: string[]
    data: T
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorType>