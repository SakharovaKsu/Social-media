import React, { FC } from 'react'
import { addPostAC, updateNewPostTextAC } from '../../../redux/postPageReducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { postPageSelector } from '../../../redux/selectors/postPageSelector'
import { StoreType } from '../../../redux/reduxStore'

const mapStateToProps = (state: StoreType) => {
    return {
        postPage: postPageSelector(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        newPostCallback: () => {
            dispatch(addPostAC())
        },
        onPostChangeCallback: (text: string) => {
            if (text) {
                dispatch(updateNewPostTextAC(text))
            }
        },
    }
}

export const MyPostsContainer = compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps))(MyPosts)
