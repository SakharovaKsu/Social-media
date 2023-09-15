
type AllActionType = FollowType | UnfollowType | SetUsersType | SetCurrentPageType | SetUsersTotalCountType | ToggleIsFetchingType | ToggleIsFollowingProgressType

type FollowType = ReturnType<typeof followAC>
type UnfollowType = ReturnType<typeof unfollowAC>
type SetUsersType = ReturnType<typeof setUsersAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type SetUsersTotalCountType = ReturnType<typeof setUsersTotalCountAC>
type ToggleIsFetchingType = ReturnType<typeof toggleIsFetchingAC>
type ToggleIsFollowingProgressType = ReturnType<typeof toggleIsFollowingProgressAC>

type LocationType = {
    country: string
    city: string
}

export type UserType = {
    id: number
    name: string
    photos: any
    status: string
    followed: boolean
    location: LocationType
}

export type InitialStateUsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number

    // отображение текущей страницы (пагинация)
    currentPage: number

    // Крутилка - анимация (ожидания ответа от сервера)
    isFetching: boolean

    // для блокировки кнопки во время запроса на сервер
    followingInProgress: number[]
}

export const initialStateUser: InitialStateUsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state = initialStateUser, action: AllActionType ): InitialStateUsersType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)
            }
        }
        case 'SET-USERS': {
            return {...state, users: action.payload.users}
        }
        case 'SET-CURRENT-PAGE': {
            return {...state, currentPage: action.payload.page}
        }
        case 'SET-TOTAL-COUNT': {
            return {...state, totalUsersCount: action.payload.count}
        }
        case 'TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.payload.isFetching}
        }
        case 'TOGGLE-IS-FOLLOWING-PROGRESS': {
            return {...state, followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)}
        }
        default:
            return state
    }
}

export const followAC = (userId: number) => ({type: 'FOLLOW', payload: {userId}} as const)
export const unfollowAC = (userId: number) => ({type: 'UNFOLLOW', payload: {userId}} as const)
export const setUsersAC = (users: UserType[]) => ({type: 'SET-USERS', payload: {users}} as const)
export const setCurrentPageAC = (page: number) => ({type: 'SET-CURRENT-PAGE', payload: {page}} as const)
export const setUsersTotalCountAC = (count: number) => ({type: 'SET-TOTAL-COUNT', payload: {count}} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', payload: {isFetching}} as const)
export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: number) => ({type: 'TOGGLE-IS-FOLLOWING-PROGRESS', payload:{isFetching, userId}} as const)

