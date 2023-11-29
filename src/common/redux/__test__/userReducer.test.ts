import { actionsUsers, InitialStateUsersType, usersReducer } from '../usersReducer'

describe('userReducer', () => {
    let initialState: InitialStateUsersType
    beforeEach(() => {
        initialState = {
            users: [
                {
                    id: 2,
                    name: 'Git',
                    photos: '',
                    status: '',
                    followed: false,
                    location: {
                        country: '',
                        city: '',
                    },
                },
            ],
            pageSize: 8,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [],
        }
    })

    it('Checking for user subscription', () => {
        const action = actionsUsers.follow(2)
        const newState = usersReducer(initialState, action)

        expect(newState.users[0].followed).toBe(true)
    })

    it('Checking for user unsubscribe', () => {
        const action = actionsUsers.unfollow(2)
        const newState = usersReducer(initialState, action)

        expect(newState.users[0].followed).toBe(false)
    })
})
