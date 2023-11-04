import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { StoreType } from '../../redux/reduxStore'
import { getProfileTC, getStatusTC, updateStatusTC } from '../../redux/postPageReducer'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import s from '../Users/Users.module.css'
import Preloader from '../Elements/Preloader/Preloader'
import { profileSelector, statusSelector } from '../../redux/selectors/postPageSelector'
import { idUserSelector } from '../../redux/selectors/authSelector'

type PathParamsType = { userId: string }
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    getProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
    savePhoto: (photos: File) => void
}
type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainer = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileAPIContainer extends React.Component<ProfileContainer> {
    refreshProfile() {
        let userId: string | null = this.props.match.params.userId

        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push('./login')
            }
        }

        this.props.getProfileTC(userId as string)
        this.props.getStatusTC(userId as string)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainer>, prevState: Readonly<{}>, snapshot?: any) {
        // что б не было зациклиности, доьавляем проверку, что если id не совпадает с предыдущим id из стейта, то вызываем функ.
        if (this.props.match.params.userId != prevProps.match.params.userId) this.refreshProfile()
    }

    shouldComponentUpdate(nextProps: ProfileContainer) {
        // Проверяем, изменились ли необходимые свойства, которые влияют на рендер компонента
        if (
            nextProps.match.params.userId !== this.props.match.params.userId ||
            nextProps.profile !== this.props.profile ||
            nextProps.status !== this.props.status ||
            nextProps.authorizedUserId !== this.props.authorizedUserId ||
            nextProps.appStatus !== this.props.appStatus ||
            nextProps.savePhoto !== this.props.savePhoto
        ) {
            return true // Рендер компонента
        }
        return false // Пропускаем рендер компонента
    }

    render() {
        return (
            <>
                <div className={s.containerPreloader}>{this.props.status === 'loading' && <Preloader />}</div>

                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatusTC={this.props.updateStatusTC}
                />
            </>
        )
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        profile: profileSelector(state),
        status: statusSelector(state),
        authorizedUserId: idUserSelector(state),
        appStatus: state.app.status,
    }
}

const mapDispatchToProps = { getProfileTC, getStatusTC, updateStatusTC }

export const ProfileContainer = compose<React.ComponentType>(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(ProfileAPIContainer)

// withRouter возвращает новую компоненту, в которую закинет данные из url
// connect -> withRouter -> withAuthRedirect -> ProfileAPIContainer -> Profile
// withRouter здесь достаем данные из url, закидываем их в ProfileAPIContainer.

// compose - это функция, которая позволяет объединить несколько функций высшего порядка (HOC) в одну. Она принимает несколько HOC в качестве аргументов и возвращает новую функцию, которая последовательно применяет эти HOC к компоненте, переданной в последний аргумент.
// В ProfileContainer, compose используется для объединения 3 HOC: withAuthRedirect, withRouter и connect. Порядок применения HOC определяется порядком их передачи в compose. В итоге, ProfileAPIContainer оборачивается в withAuthRedirect, затем в withRouter, и, наконец, в connect, который обеспечивает связь компонента с Redux store.
