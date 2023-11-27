import { actionsAuth, authReducer } from '../authReducer'

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}

describe('authReducer', () => {
    let initialState: InitialStateType

    beforeEach(() => {
        initialState = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captchaUrl: null,
        }
    })

    it('must add user', () => {
        const setUser = {
            id: 2,
            login: 'gol',
            email: 'gol@gmail.com',
            isAuth: true,
            captchaUrl: null,
        }

        const action = actionsAuth.setUserData(setUser)
        const newState = authReducer(initialState, action)

        expect(newState.login).toBe('gol')
        expect(newState.id).toBe(2)
    })

    it('the user must log out of the profile', () => {
        const action = actionsAuth.setIsLoggedIn(false)
        const newState = authReducer(initialState, action)

        expect(newState.isAuth).toBe(false)
    })
})
