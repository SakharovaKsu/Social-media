import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {
    followAC,
    setCurrentPageAC,
    setUsersTotalCountAC,
    setUsersAC,
    unfollowAC,
    toggleIsFetchingAC
} from '../../redux/usersReducer';
import {StoreType} from '../../redux/reduxStore';
import {Users} from './Users';
import axios from 'axios';
import Preloader from '../Elements/Preloader/Preloader';
import s from './Users.module.css'

type FromReduxType = ConnectedProps<typeof connector>;

class UsersAPIComponent extends React.Component<FromReduxType>{

    // ? - после вопроса идет get-параметр, 'ключ'='значение' (то, что запрашиваем у сервера), &-разделительный символ
    componentDidMount() {
        // когда запрос пошел, меняем состояние
        this.props.toggleIsFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {

                // запрос получили, меняем состояние
                this.props.toggleIsFetching(false)

                // сетаем
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }

    // Меняем страничку пользователей
    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)

        // делаем запрос на сервер для текущей странице по клике
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
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
        isFetching: state.usersPage.isFetching
    }
}

// то что диспачем
const mapDispatchToProps = {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setUsersTotalCount: setUsersTotalCountAC,
    toggleIsFetching: toggleIsFetchingAC
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export const UsersContainer: FC = connector(UsersAPIComponent);
