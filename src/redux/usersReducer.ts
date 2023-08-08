import {v1} from 'uuid';
import {stat} from 'fs';


type AllActionType = FollowType | UnfollowType | SetUsersType

type FollowType = ReturnType<typeof followAC>
type UnfollowType = ReturnType<typeof unfollowAC>
type SetUsersType = ReturnType<typeof setUsersAC>

type LocationType = {
    country: string
    city: string
}

export type UserType = {
    id: string
    name: string
    src: string
    followed: boolean
    location: LocationType
}

export type InitialStateType = {
    users: UserType[]
}

export const initialState: InitialStateType = {
    users: [
        {
            id: v1(),
            name: 'Terry McDaniel',
            src: 'https://i.ibb.co/dMWjm0P/user-1.png',
            followed: false,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Randy Russell',
            src: 'https://i.ibb.co/8MbKKLQ/user-3.png',
            followed: false,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Charlotte Peters',
            src: 'https://i.ibb.co/258YhJH/user-2.png',
            followed: true,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Pearl Ward',
            src: 'https://i.ibb.co/FhnF64b/user-5.png',
            followed: true,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Martha Gross',
            src: 'https://i.ibb.co/Xp4HMsd/user-4.png',
            followed: true,
            location: {country: 'Russia', city: 'Moscow'}
        },
    ]
}

export const usersReducer = (state = initialState, action: AllActionType ): InitialStateType => {
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
            return {...state, users: [...state.users, ...action.payload.users]}
        }
        default:
            return state
    }
}

export const followAC = (userId: string) => {
    return {
        type: 'FOLLOW',
        payload: {userId}
    } as const
}

export const unfollowAC = (userId: string) => {
    return {
        type: 'UNFOLLOW',
        payload: {userId}
    } as const
}

export const setUsersAC = (users: any) => {
    return {
        type: 'SET-USERS',
        payload: {users}
    } as const
}

