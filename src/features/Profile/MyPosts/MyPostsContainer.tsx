import React from 'react'
import { actionsPostPage } from '../../../common/redux/postPageReducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { postPageSelector } from '../../../common/redux/selectors/postPageSelector'
import { StoreType } from '../../../common/redux/store'

const mapStateToProps = (state: StoreType) => {
    return {
        postPage: postPageSelector(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        newPostCallback: () => {
            dispatch(actionsPostPage.addPost())
        },
        onPostChangeCallback: (text: string) => {
            if (text) {
                dispatch(actionsPostPage.updateNewPostText(text))
            }
        },
    }
}

export const MyPostsContainer = compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps))(MyPosts)
