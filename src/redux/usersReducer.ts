import {v1} from 'uuid';
import user1 from '../images/avatar-user/user-1.svg';
import user2 from '../images/avatar-user/user-2.svg';
import user3 from '../images/avatar-user/user-3.svg';
import user4 from '../images/avatar-user/user-4.svg';
import user5 from '../images/avatar-user/user-5.svg';

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
    src: any
    status: string
    followed: boolean
    location: LocationType
}

export type InitialStateUsersType = {
    users: UserType[]
}

export const initialStateUser: InitialStateUsersType = {
    users: [
        {
            id: v1(),
            name: 'Terry McDaniel',
            src: user1,
            status: 'This headline will attract the right',
            followed: false,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Randy Russell',
            src: user3,
            status: 'This headline will attract the right',
            followed: false,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Charlotte Peters',
            src: user2,
            status: 'This headline will attract the right',
            followed: true,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Pearl Ward',
            src: user5,
            status: 'This headline will attract the right',
            followed: true,
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            id: v1(),
            name: 'Martha Gross',
            src: user4,
            status: 'This headline will attract the right',
            followed: true,
            location: {country: 'Russia', city: 'Moscow'}
        },
    ]
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

export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'SET-USERS',
        payload: {users}
    } as const
}

