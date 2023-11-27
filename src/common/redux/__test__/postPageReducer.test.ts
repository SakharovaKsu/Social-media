import {
    addPost,
    postPageReducer,
    PostPageType,
    setStatus,
    setUserProfile,
    updateNewPostText,
    updateStatus,
} from '../postPageReducer'
import { v1 } from 'uuid'

// Тестирование редьюсера postPageReducer
describe('postPageReducer', () => {
    let initialState: PostPageType

    beforeEach(() => {
        initialState = {
            postsData: [
                {
                    id: v1(),
                    message: 'Global Travel And Vacations Luxury Travel On A Tight Budget',
                    src: 'https://i.ibb.co/6w8wDCj/MyPost-1.jpg',
                    likeCount: 1000,
                },
                {
                    id: v1(),
                    message: 'A morning bike trip to the mountains is the best rest from the bustle of the city',
                    src: 'https://i.ibb.co/xLPQLDG/MyPost-2.jpg',
                    likeCount: 232,
                },
            ],
            newPostText: '',
            profile: {
                aboutMe: '',
                contacts: {
                    facebook: '',
                    website: '',
                    vk: '',
                    twitter: '',
                    instagram: '',
                    youtube: '',
                    github: '',
                    mainLink: '',
                },
                lookingForAJob: true,
                lookingForAJobDescription: '',
                fullName: '',
                photos: {
                    small: '',
                    large: '',
                },
                userId: 2,
            },
            status: '',
        }
    })

    test('adding a new post', () => {
        const action = addPost()
        const newState = postPageReducer(initialState, action)

        expect(newState.postsData.length).toBe(initialState.postsData.length + 1)
        expect(newState.postsData[newState.postsData.length - 1].message).toBe(initialState.newPostText)
        expect(newState.newPostText).toBe('')
    })

    test('updating the text of a new post', () => {
        const newText = 'New post text'
        const action = updateNewPostText(newText)
        const newState = postPageReducer(initialState, action)

        expect(newState.newPostText).toBe(newText)
    })

    test('adding a user', () => {
        const newUsers = {
            aboutMe: '',
            contacts: {
                facebook: '',
                website: '',
                vk: 'nad',
                twitter: '',
                instagram: 'anna',
                youtube: '',
                github: '',
                mainLink: '',
            },
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: 'Anna',
            photos: {
                small: '',
                large: '',
            },
            userId: 21,
        }
        const action = setUserProfile(newUsers)
        const newState = postPageReducer(initialState, action)

        expect(newState.profile).toBe(newUsers)
    })

    test('check for adding a new status', () => {
        const newStatus = 'New post text'
        const action = setStatus(newStatus)
        const newState = postPageReducer(initialState, action)

        expect(newState.status).toBe(newStatus)
        expect(newState.status.length).toBe(13)
    })

    test('checking for status changes', () => {
        const newStatus = 'update status'
        const action = updateStatus(newStatus)
        const newState = postPageReducer(initialState, action)

        expect(newState.status).toBe(updateStatus)
        expect(newState.status.length).toBe(13)
    })
})
