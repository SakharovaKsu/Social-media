import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {followAC, setCurrentPageAC, setUsersTotalCountAC, setUsersAC, unfollowAC, UserType} from '../../redux/usersReducer';
import {StoreType} from '../../redux/redux-store';
import {Users} from './Users';
import axios from 'axios';

type PropsFromRedux = ConnectedProps<typeof connector>;

class UsersAPIComponent extends React.Component<PropsFromRedux>{

    // ? - после вопроса идет get-параметр, 'ключ'='значение' (то, что запрашиваем у сервера), &-разделительный символ
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                // сетаем
                this.props.setUsersCallback(response.data.items)
                this.props.setUsersTotalCountCallback(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPageCallback(pageNumber)

        // делаем запрос на сервер для текущей странице по клике
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsersCallback(response.data.items)
            })
    }

    render() {

        return <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            usersPage={this.props.usersPage}
            followCallback={this.props.followCallback}
            unfollowCallback={this.props.unfollowCallback}
            onPageChanged={this.onPageChanged}
        />
    }
}

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

const connector = connect(mapStateToProps, mapDispatchToProps);

export const UsersContainer: FC = connector(UsersAPIComponent);
