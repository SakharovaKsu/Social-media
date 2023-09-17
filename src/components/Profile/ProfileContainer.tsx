import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {StoreType} from '../../redux/reduxStore';
import {getProfileTC} from '../../redux/postPageReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';

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
        profile: state.postPage.profile
    }
}

const mapDispatchToProps =  {getProfileTC}

// withRouter возвращает новую компоненту, в которую закинет данные из url
const withUrlDataContainerComponent =  withRouter(ProfileAPIContainer)

const connector = connect(mapStateToProps, mapDispatchToProps)
export const ProfileContainer = connector(withUrlDataContainerComponent);

export default ProfileContainer

// В этой компоненте несколько оберток.
// ProfileContainer -> withUrlDataContainerComponent -> ProfileAPIContainer -> Profile  ProfileContainer

// ProfileContainer достаем все необходимое из стора, диспачим и передаем далее.
// withUrlDataContainerComponent здесь достаем данные из url, закидываем их в ProfileAPIContainer.
// В ProfileAPIContainer достаем все нужные данные для Profile и в нее прокидываем.
