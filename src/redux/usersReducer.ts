import { AnyAction, Dispatch } from 'redux'
import { userAPI } from '../api/api'
import { RESULT_CODE } from './authReducer'
import { AxiosResponse } from 'axios'
import { boundFollowUnfollowFlow } from '../utils/ boundFollowUnfollowFlow'

type AllActionType =
    | FollowType
    | UnfollowType
    | SetUsersType
    | SetCurrentPageType
    | SetUsersTotalCountType
    | ToggleIsFetchingType
    | ToggleIsFollowingProgressType

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
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

export const usersReducer = (state = initialStateUser, action: AllActionType): InitialStateUsersType => {
    switch (action.type) {
        case 'USERS/FOLLOW': {
            return boundFollowUnfollowFlow(state, action.payload.userId, true)
        }
        case 'USERS/UNFOLLOW': {
            return boundFollowUnfollowFlow(state, action.payload.userId, false)
        }
        case 'USERS/SET-USERS': {
            return { ...state, users: action.payload.users }
        }
        case 'USERS/SET-CURRENT-PAGE': {
            return { ...state, currentPage: action.payload.page }
        }
        case 'USERS/SET-TOTAL-COUNT': {
            return { ...state, totalUsersCount: action.payload.count }
        }
        case 'USERS/TOGGLE-IS-FETCHING': {
            return { ...state, isFetching: action.payload.isFetching }
        }
        case 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS': {
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter((id) => id !== action.payload.userId),
            }
        }
        default:
            return state
    }
}

export const followAC = (userId: number) => ({ type: 'USERS/FOLLOW', payload: { userId } }) as const
export const unfollowAC = (userId: number) => ({ type: 'USERS/UNFOLLOW', payload: { userId } }) as const
export const setUsersAC = (users: UserType[]) => ({ type: 'USERS/SET-USERS', payload: { users } }) as const
export const setCurrentPageAC = (page: number) => ({ type: 'USERS/SET-CURRENT-PAGE', payload: { page } }) as const
export const setUsersTotalCountAC = (count: number) => ({ type: 'USERS/SET-TOTAL-COUNT', payload: { count } }) as const
export const toggleIsFetchingAC = (isFetching: boolean) =>
    ({ type: 'USERS/TOGGLE-IS-FETCHING', payload: { isFetching } }) as const
export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: number) =>
    ({ type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS', payload: { isFetching, userId } }) as const

const followUnfollowFlow = async (
    id: number,
    dispatch: Dispatch<AnyAction>,
    apiMethod: (id: number) => Promise<any>,
    actionCreator: (userId: number) => AnyAction,
) => {
    dispatch(toggleIsFollowingProgressAC(true, id))

    const response = await apiMethod(id)

    // всегда делаем проверку значения resultCode, который получаем из сервака
    if (response.data.resultCode === RESULT_CODE.OK) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowingProgressAC(false, id))
}

export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(toggleIsFetchingAC(true))

        const response = await userAPI.getUsers(currentPage, pageSize)

        // запрос получили, меняем состояние
        dispatch(toggleIsFetchingAC(false))

        // сетаем
        dispatch(setUsersAC(response.items))
        dispatch(setUsersTotalCountAC(response.totalCount))
    } catch (error) {}
}

export const onPageChangedTC = (pageNumber: number, pageSize: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(pageNumber))

        // делаем запрос на сервер для текущей странице по клике
        const response = await userAPI.getUsers(pageNumber, pageSize)

        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(response.items))
    } catch (error) {}
}

export const followTC = (id: number) => async (dispatch: Dispatch) => {
    try {
        const apiMethod = userAPI.followUser.bind(id)
        followUnfollowFlow(id, dispatch, apiMethod, followAC)
    } catch (error) {}
}

export const unfollowTC = (id: number) => async (dispatch: Dispatch) => {
    try {
        const apiMethod = userAPI.unfollowUser.bind(id)
        followUnfollowFlow(id, dispatch, apiMethod, unfollowAC)
    } catch (error) {}
}
