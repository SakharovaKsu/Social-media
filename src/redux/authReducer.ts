type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
};

export const setUserDataAC = (user: InitialStateType) => ({type: 'SET-USER-DATA', payload: {user}} as const)

type SetUserDataType = ReturnType<typeof setUserDataAC>;

type AllType = SetUserDataType;

const initialState : InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

export const authReducer = (state = initialState, action: AllType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA': {
            return {...state, ...action.payload.user, isAuth: true};
        }
        default:
            return state;
    }
}
