import {AllActionType} from './state';
import {v1} from 'uuid';

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
type setUserProfileType = ReturnType<typeof setUserProfileAC>
export type AllPostActionType =  AddPostActionType | UpdateNewPostTextActionType | setUserProfileType

export type PostsDataType = {
    id: string
    message: string
    src: string
    likeCount: number
}

export type PostPageType = {
    postsData: PostsDataType[]
    newPostText: string
    profile: any
}

const postPage: PostPageType = {
    postsData: [
        {
            id: v1(),
            message: 'Global Travel And Vacations Luxury Travel On A Tight Budget',
            src: 'https://i.ibb.co/6w8wDCj/MyPost-1.jpg',
            likeCount: 1000
        },
        {
            id: v1(),
            message: 'A morning bike trip to the mountains is the best rest from the bustle of the city',
            src: 'https://i.ibb.co/xLPQLDG/MyPost-2.jpg',
            likeCount: 232
        },
    ],
    newPostText: '',
    profile: null
    // profile: {
    //     "aboutMe": "я круто чувак 1001%",
    //     "contacts": {
    //         "facebook": "facebook.com",
    //         "website": null,
    //         "vk": "vk.com/dimych",
    //         "twitter": "https://twitter.com/@sdf",
    //         "instagram": "instagra.com/sds",
    //         "youtube": null,
    //         "github": "github.com",
    //         "mainLink": null
    //     },
    //     "lookingForAJob": true,
    //     "lookingForAJobDescription": "не ищу, а дурачусь",
    //     "fullName": "samurai dimych",
    //     "userId": 2,
    //     "photos": {
    //         "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
    //         "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
    //     }
    // }
}

export const postPageReducer = (state = postPage, action: AllActionType ): PostPageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: v1(),
                message: state.newPostText,
                src: ' ',
                likeCount: 0
            }
            state.newPostText = '' // обнуляем инпут
            return {...state, postsData: [...state.postsData, newPost]}
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.payload.text}
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.payload.profile}
        }
        default:
            return state
    }
}

export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        payload: {text}
    } as const
}

export const setUserProfileAC = (profile: any) => {
    return {
        type: 'SET-USER-PROFILE',
        payload: {profile}
    } as const
}