import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { StoreType } from '../../common/redux/store'
import { getProfileTC, getStatusTC, updateStatusTC } from '../../common/redux/postPageReducer'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../common/hoc/withAuthRedirect'
import { compose } from 'redux'
import s from '../Users/Users.module.css'
import Preloader from '../Elements/Preloader/Preloader'
import { profileSelector, statusSelector } from '../../common/redux/selectors/postPageSelector'
import { idUserSelector } from '../../common/redux/selectors/authSelector'

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
        if (
            nextProps.match.params.userId !== this.props.match.params.userId ||
            nextProps.profile !== this.props.profile ||
            nextProps.status !== this.props.status ||
            nextProps.authorizedUserId !== this.props.authorizedUserId ||
            nextProps.appStatus !== this.props.appStatus ||
            nextProps.savePhoto !== this.props.savePhoto
        ) {
            return true
        }
        return false
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
