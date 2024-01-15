import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { getUsersTC, onPageChangedTC, unfollowTC, followTC } from '../../common/redux/usersReducer'
import { StoreType } from '../../common/redux/store'
import { Users } from './Users'
import axios from 'axios'
import Preloader from '../Elements/Preloader/Preloader'
import s from './UsersContainer.module.css'
import { compose } from 'redux'
import { withAuthRedirect } from '../../common/hoc/withAuthRedirect'
import {
    currentPageSelector,
    followingInProgressSelector,
    isFetchingSelector,
    pageSizeSelector,
    totalUsersCountSelector,
    usersSelector,
} from '../../common/redux/selectors/usersSelector'

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '38441d44-efce-4f1f-95aa-be1f9fc10993',
    },
})

type FromReduxType = ConnectedProps<typeof connector>

class Component extends React.Component<FromReduxType> {
    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    houldComponentUpdate(nextProps: FromReduxType) {
        if (
            nextProps.totalUsersCount !== this.props.totalUsersCount ||
            nextProps.pageSize !== this.props.pageSize ||
            nextProps.currentPage !== this.props.currentPage ||
            nextProps.isFetching !== this.props.isFetching ||
            nextProps.followingInProgress !== this.props.followingInProgress ||
            nextProps.usersPage !== this.props.usersPage
        ) {
            return true
        }
        return false
    }

    onPageChanged = (pageNumber: number) => {
        this.props.onPageChangedTC(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                <div className={s.containerPreloader}>{this.props.isFetching ? <Preloader /> : null}</div>
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
        )
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        usersPage: usersSelector(state),
        pageSize: pageSizeSelector(state),
        totalUsersCount: totalUsersCountSelector(state),
        currentPage: currentPageSelector(state),
        isFetching: isFetchingSelector(state),
        followingInProgress: followingInProgressSelector(state),
    }
}

// то что диспачем
const mapDispatchToProps = {
    getUsersTC,
    onPageChangedTC,
    followTC,
    unfollowTC,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Component)
