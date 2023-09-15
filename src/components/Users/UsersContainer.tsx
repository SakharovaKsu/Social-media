import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {
    followAC,
    setCurrentPageAC,
    setUsersTotalCountAC,
    setUsersAC,
    unfollowAC,
    toggleIsFetchingAC, toggleIsFollowingProgressAC, getUsersTC
} from '../../redux/usersReducer';
import {StoreType} from '../../redux/reduxStore';
import {Users} from './Users';
import axios from 'axios';
import Preloader from '../Elements/Preloader/Preloader';
import s from './Users.module.css'
import {usersApi} from '../../api/api';

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993'}
})

type FromReduxType = ConnectedProps<typeof connector>;

class UsersAPIComponent extends React.Component<FromReduxType> {

    componentDidMount() {
        console.log(this.props)
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    // Меняем страничку пользователей
    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)

        // делаем запрос на сервер для текущей странице по клике
        usersApi.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {

        return <>
            <div className={s.containerPreloader}>
                {this.props.isFetching ? <Preloader/> : null}
            </div>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                usersPage={this.props.usersPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onPageChanged={this.onPageChanged}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// то что диспачем
const mapDispatchToProps = {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setUsersTotalCount: setUsersTotalCountAC,
    toggleIsFetching: toggleIsFetchingAC,
    toggleIsFollowingProgress: toggleIsFollowingProgressAC,
    getUsersTC
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export const UsersContainer: FC = connector(UsersAPIComponent);
