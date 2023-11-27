import { AnyAction, Dispatch } from 'redux'
import { boundFollowUnfollowFlow } from '../utils/ boundFollowUnfollowFlow'
import { Thunk } from './appReducer'
import { userAPI } from '../api/user.api'
import { RESULT_CODE } from '../enums/enums'

type AllActionType =
    | FollowType
    | UnfollowType
    | SetUsersType
    | SetCurrentPageType
    | SetUsersTotalCountType
    | ToggleIsFetchingType
    | ToggleIsFollowingProgressType

type FollowType = ReturnType<typeof follow>
type UnfollowType = ReturnType<typeof unfollow>
type SetUsersType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetUsersTotalCountType = ReturnType<typeof setUsersTotalCount>
type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>
type ToggleIsFollowingProgressType = ReturnType<typeof toggleIsFollowingProgress>

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
    pageSize: 8,
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

export const follow = (userId: number) => ({ type: 'USERS/FOLLOW', payload: { userId } }) as const
export const unfollow = (userId: number) => ({ type: 'USERS/UNFOLLOW', payload: { userId } }) as const
export const setUsers = (users: UserType[]) => ({ type: 'USERS/SET-USERS', payload: { users } }) as const
export const setCurrentPage = (page: number) => ({ type: 'USERS/SET-CURRENT-PAGE', payload: { page } }) as const
export const setUsersTotalCount = (count: number) => ({ type: 'USERS/SET-TOTAL-COUNT', payload: { count } }) as const
export const toggleIsFetching = (isFetching: boolean) =>
    ({ type: 'USERS/TOGGLE-IS-FETCHING', payload: { isFetching } }) as const
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) =>
    ({ type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS', payload: { isFetching, userId } }) as const

const followUnfollowFlow = async (
    id: number,
    dispatch: Dispatch<AnyAction>,
    apiMethod: (id: number) => Promise<any>,
    actionCreator: (userId: number) => AnyAction,
) => {
    dispatch(toggleIsFollowingProgress(true, id))

    const response = await apiMethod(id)

    // всегда делаем проверку значения resultCode, который получаем из сервака
    if (response.data.resultCode === RESULT_CODE.OK) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowingProgress(false, id))
}

export const getUsersTC =
    (currentPage: number, pageSize: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(toggleIsFetching(true))

            const response = await userAPI.getUsers(currentPage, pageSize)

            dispatch(toggleIsFetching(false))

            dispatch(setUsers(response.items))
            dispatch(setUsersTotalCount(response.totalCount))
        } catch (error) {}
    }

export const onPageChangedTC =
    (pageNumber: number, pageSize: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(toggleIsFetching(true))
            dispatch(setCurrentPage(pageNumber))

            // делаем запрос на сервер для текущей странице по клике
            const response = await userAPI.getUsers(pageNumber, pageSize)

            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.items))
        } catch (error) {}
    }

export const followTC =
    (id: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            const apiMethod = userAPI.followUser.bind(id)
            followUnfollowFlow(id, dispatch, apiMethod, follow)
        } catch (error) {}
    }

export const unfollowTC =
    (id: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            const apiMethod = userAPI.unfollowUser.bind(id)
            followUnfollowFlow(id, dispatch, apiMethod, unfollow)
        } catch (error) {}
    }
