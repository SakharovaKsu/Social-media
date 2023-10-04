import React, {FC} from 'react';
import {addPostAC, updateNewPostTextAC} from '../../../redux/postPageReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {StateType} from '../../../redux/state';

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

export const MyPostsContainer = compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps))(MyPosts)