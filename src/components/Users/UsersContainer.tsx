import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {
    followAC,
    setCurrentPageAC,
    setUsersTotalCountAC,
    setUsersAC,
    unfollowAC,
    UserType,
    toggleIsFetchingAC
} from '../../redux/usersReducer';
import {StoreType} from '../../redux/redux-store';
import {Users} from './Users';
import axios from 'axios';
import Preloader from '../Elements/Preloader/Preloader';

type PropsFromRedux = ConnectedProps<typeof connector>;

class UsersAPIComponent extends React.Component<PropsFromRedux>{

    // ? - после вопроса идет get-параметр, 'ключ'='значение' (то, что запрашиваем у сервера), &-разделительный символ
    componentDidMount() {
        // когда запрос пошел, меняем состояние
        this.props.toggleIsFetchingCallback(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {

                // запрос получили, меняем состояние
                this.props.toggleIsFetchingCallback(false)

                // сетаем
                this.props.setUsersCallback(response.data.items)
                this.props.setUsersTotalCountCallback(response.data.totalCount)
            })
    }

    // Меняем страничку пользователей
    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetchingCallback(true)
        this.props.setCurrentPageCallback(pageNumber)

        // делаем запрос на сервер для текущей странице по клике
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingCallback(false)
                this.props.setUsersCallback(response.data.items)
            })
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                usersPage={this.props.usersPage}
                followCallback={this.props.followCallback}
                unfollowCallback={this.props.unfollowCallback}
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
        },
        toggleIsFetchingCallback: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export const UsersContainer: FC = connector(UsersAPIComponent);
