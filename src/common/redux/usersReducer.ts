import { AnyAction, Dispatch } from 'redux'
import { boundFollowUnfollowFlow } from '../utils/ boundFollowUnfollowFlow'
import { userAPI } from '../api/user.api'
import { RESULT_CODE } from '../enums/enums'
import { BaseThunk, InferAction } from './ActionsType/InferAction'

export type ActionsUsers = InferAction<typeof actionsUsers>
type Thunk = BaseThunk<ActionsUsers>

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

export const usersReducer = (state = initialStateUser, action: ActionsUsers): InitialStateUsersType => {
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

export const actionsUsers = {
    follow: (userId: number) => ({ type: 'USERS/FOLLOW', payload: { userId } }) as const,
    unfollow: (userId: number) => ({ type: 'USERS/UNFOLLOW', payload: { userId } }) as const,
    setUsers: (users: UserType[]) => ({ type: 'USERS/SET-USERS', payload: { users } }) as const,
    setCurrentPage: (page: number) => ({ type: 'USERS/SET-CURRENT-PAGE', payload: { page } }) as const,
    setUsersTotalCount: (count: number) => ({ type: 'USERS/SET-TOTAL-COUNT', payload: { count } }) as const,
    toggleIsFetching: (isFetching: boolean) => ({ type: 'USERS/TOGGLE-IS-FETCHING', payload: { isFetching } }) as const,
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS', payload: { isFetching, userId } }) as const,
}

const followUnfollowFlow = async (
    id: number,
    dispatch: Dispatch<AnyAction>,
    apiMethod: (id: number) => Promise<any>,
    actionCreator: (userId: number) => AnyAction,
) => {
    dispatch(actionsUsers.toggleIsFollowingProgress(true, id))

    const response = await apiMethod(id)

    if (response.data.resultCode === RESULT_CODE.OK) {
        dispatch(actionCreator(id))
    }
    dispatch(actionsUsers.toggleIsFollowingProgress(false, id))
}

export const getUsersTC =
    (currentPage: number, pageSize: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(actionsUsers.toggleIsFetching(true))

            const response = await userAPI.getUsers(currentPage, pageSize)

            dispatch(actionsUsers.toggleIsFetching(false))
            dispatch(actionsUsers.setUsers(response.items))
            dispatch(actionsUsers.setUsersTotalCount(response.totalCount))
        } catch (error) {}
    }

export const onPageChangedTC =
    (pageNumber: number, pageSize: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(actionsUsers.toggleIsFetching(true))
            dispatch(actionsUsers.setCurrentPage(pageNumber))

            // делаем запрос на сервер для текущей странице по клике
            const response = await userAPI.getUsers(pageNumber, pageSize)

            dispatch(actionsUsers.toggleIsFetching(false))
            dispatch(actionsUsers.setUsers(response.items))
        } catch (error) {}
    }

export const followTC =
    (id: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            const apiMethod = userAPI.followUser.bind(id)
            followUnfollowFlow(id, dispatch, apiMethod, actionsUsers.follow)
        } catch (error) {}
    }

export const unfollowTC =
    (id: number): Thunk =>
    async (dispatch: Dispatch) => {
        try {
            const apiMethod = userAPI.unfollowUser.bind(id)
            followUnfollowFlow(id, dispatch, apiMethod, actionsUsers.unfollow)
        } catch (error) {}
    }
