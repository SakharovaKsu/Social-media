import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {followAC, setCurrentPageAC, setUsersTotalCountAC, setUsersAC, unfollowAC, UserType} from '../../redux/usersReducer';
import {StoreType} from '../../redux/redux-store';
import UsersC from './UsersС';

const mapStateToProps = (state: StoreType) => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        followCallback: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollowCallback: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsersCallback: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPageCallback: (page: number) => {
            dispatch(setCurrentPageAC(page))
        },
        setUsersTotalCountCallback: (count: number) => {
            dispatch(setUsersTotalCountAC(count))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)
