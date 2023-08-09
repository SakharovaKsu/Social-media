import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {Dispatch} from 'redux';
import {followAC, setUsersAC, unfollowAC} from '../../redux/usersReducer';
import {StoreType} from '../../redux/redux-store';

const mapStateToProps = (state: StoreType) => {
    return {
        users: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        followCallback: (userId: string) => {
            dispatch(followAC(userId))
        },
        unfollowCallback: (userId: string) => {
            dispatch(unfollowAC(userId))
        },
        setUsersCallback: (users: any) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
