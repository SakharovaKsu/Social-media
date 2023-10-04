import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {StoreType} from '../../redux/reduxStore';
import {getProfileTC} from '../../redux/postPageReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type PathParamsType = { userId: string }
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = { getProfileTC: (userId: string) => void }
type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainer = RouteComponentProps<PathParamsType> & ProfileContainerType;

class ProfileAPIContainer extends React.Component<ProfileContainer> {

    componentDidMount() {
        let userId = this.props.match.params.userId

        if(!userId) {
            userId = (2).toString()
        }

        this.props.getProfileTC(userId)
    }

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        profile: state.postPage.profile,
        // isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps =  {getProfileTC}

export const ProfileContainer = compose<React.ComponentType>(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProfileAPIContainer)

// withRouter возвращает новую компоненту, в которую закинет данные из url
// connect -> withRouter -> withAuthRedirect -> ProfileAPIContainer -> Profile
// withRouter здесь достаем данные из url, закидываем их в ProfileAPIContainer.

// compose - это функция, которая позволяет объединить несколько функций высшего порядка (HOC) в одну. Она принимает несколько HOC в качестве аргументов и возвращает новую функцию, которая последовательно применяет эти HOC к компоненте, переданной в последний аргумент.
// В ProfileContainer, compose используется для объединения 3 HOC: withAuthRedirect, withRouter и connect. Порядок применения HOC определяется порядком их передачи в compose. В итоге, ProfileAPIContainer оборачивается в withAuthRedirect, затем в withRouter, и, наконец, в connect, который обеспечивает связь компонента с Redux store.
