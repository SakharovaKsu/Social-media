import { actionsApp, appReducer, InitialStateType, RequestStatusType } from '../appReducer'

describe('appReducer', () => {
    let initialState: InitialStateType

    beforeEach(() => {
        initialState = {
            error: null as string | null,
            status: 'idle' as RequestStatusType,
            isInitialized: false,
        }
    })

    it('should set the error', () => {
        const action = actionsApp.setAppError('Oops, an error occurred!')
        const newState = appReducer(initialState, action)

        expect(newState.error).toBe('Oops, an error occurred!')
    })

    it('should set the status', () => {
        const action = actionsApp.setAppStatus('loading')
        const newState = appReducer(initialState, action)

        expect(newState.status).toBe('loading')
    })

    it('should set the initialized state', () => {
        const action = actionsApp.isAppIsInitialized(true)
        const newState = appReducer(initialState, action)

        expect(newState.isInitialized).toBe(true)
    })
})
