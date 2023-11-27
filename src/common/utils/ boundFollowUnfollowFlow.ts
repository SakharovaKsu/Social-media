import { InitialStateUsersType } from '../redux/usersReducer'

export const boundFollowUnfollowFlow = (
    state: InitialStateUsersType,
    userId: number,
    followed: boolean,
): InitialStateUsersType => {
    return {
        ...state,
        users: state.users.map((u) => (u.id === userId ? { ...u, followed } : u)),
    }
}
