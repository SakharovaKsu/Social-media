import React, {FC} from 'react';

import {addPostAC, updateNewPostTextAC} from '../../../redux/postPageReducer';
import MyPosts from './MyPosts';
import {StoreType} from '../../../redux/redux-store';



type MyPostsType = {
    store: StoreType
}

const MyPostsContainer:FC<MyPostsType> = ({store}) => {

    // const postData = store._state.postPage.postsData
    // const newPostText = store._state.postPage.newPostText
    const newStore = store.getState()
    const postData = newStore.postPage.postsData
    const newPostText = newStore.postPage.newPostText

    const dispatch = store.dispatch.bind(store)

    const newPost = () => {
        dispatch(addPostAC())
    }

    const onPostChange = (text: string) => {
        if(text) {
            dispatch(updateNewPostTextAC(text))
        }
    }

    return <MyPosts newPostCallback={newPost} onPostChangeCallback={onPostChange} postData={postData} newPostText={newPostText}/>
}

export default MyPostsContainer;