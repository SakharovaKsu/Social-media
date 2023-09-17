import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {
    getUsersTC,
    onPageChangedTC,
    unfollowTC, followTC
} from '../../redux/usersReducer';
import {StoreType} from '../../redux/reduxStore';
import {Users} from './Users';
import axios from 'axios';
import Preloader from '../Elements/Preloader/Preloader';
import s from './Users.module.css'

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993'}
})

type FromReduxType = ConnectedProps<typeof connector>;

class Component extends React.Component<FromReduxType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    // Меняем страничку пользователей
    onPageChanged = (pageNumber: number) => {
        this.props.onPageChangedTC(pageNumber, this.props.pageSize)
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
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}
                followTC={this.props.followTC}
                unfollowTC={this.props.unfollowTC}
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
    getUsersTC, onPageChangedTC, followTC, unfollowTC
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export const UsersContainer = connector(Component);
