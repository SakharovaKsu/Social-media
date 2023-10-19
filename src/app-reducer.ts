type InitialStateType = {
    error: null | string
}

const initialState = {
    // если ошибка какая-то глобальная произойдёт - запишем текст ошибки сюда
    error: null as string | null,
}

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-APP-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'SET-APP-ERROR', error} as const)

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
type ActionType = SetAppErrorType
