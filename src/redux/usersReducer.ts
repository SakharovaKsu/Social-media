import {v1} from 'uuid';

type AllActionType = FollowType | UnfollowType | SetUsersType | SetCurrentPageType | SetUsersTotalCountType

type FollowType = ReturnType<typeof followAC>
type UnfollowType = ReturnType<typeof unfollowAC>
type SetUsersType = ReturnType<typeof setUsersAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type SetUsersTotalCountType = ReturnType<typeof setUsersTotalCountAC>

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
}

export const initialStateUser: InitialStateUsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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
        default:
            return state
    }
}

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {userId}
    } as const
}

export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {userId}
    } as const
}

export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'SET-USERS',
        payload: {users}
    } as const
}

export const setCurrentPageAC = (page: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        payload: {page}
    } as const
}

export const setUsersTotalCountAC = (count: number) => {
    return {
        type: 'SET-TOTAL-COUNT',
        payload: {count}
    } as const
}

