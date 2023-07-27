import React, {FC} from 'react';
import {addPostAC, updateNewPostTextAC} from '../../../redux/postPageReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {StateType} from '../../../redux/state';


// type MyPostsType = {
//     store: StoreType
// }
//
// const MyPostsContainer:FC<MyPostsType> = ({store}) => {
//
//     const postPage = store.getState().postPage
//
//     const dispatch = store.dispatch.bind(store)
//
//     const newPost = () => {
//         dispatch(addPostAC())
//     }
//
//     const onPostChange = (text: string) => {
//         if(text) {
//             dispatch(updateNewPostTextAC(text))
//         }
//     }
//
//     return <MyPosts newPostCallback={newPost} onPostChangeCallback={onPostChange} postPage={postPage}/>
// }

const mapStateToProps = (state: StateType) => {
    return {
        postPage: state.postPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        newPostCallback: () => {
            dispatch(addPostAC())
        },
        onPostChangeCallback: (text: string) => {
            if(text) {
                dispatch(updateNewPostTextAC(text))
            }
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;