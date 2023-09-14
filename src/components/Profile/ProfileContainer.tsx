import React, {FC} from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect, ConnectedProps} from 'react-redux';
import {StoreType} from '../../redux/reduxStore';
import {setUserProfileAC} from '../../redux/postPageReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';

type ProfileContainerType = ConnectedProps<typeof connector> &
    RouteComponentProps<{ userId: string }>;

class ProfileAPIContainer extends React.Component<ProfileContainerType> {

    componentDidMount() {
        let userId = this.props.match.params.userId

        if(!userId) {
            userId = (2).toString()
        }

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId )
            .then(response => {
                this.props.setUserProfile(response.data)
            })
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

const mapDispatchToProps =  {setUserProfile: setUserProfileAC}

const connector = connect(mapStateToProps, mapDispatchToProps);

// withRouter возвращает новую компоненту, в которую закинет данные из url
const withUrlDataContainerComponent =  withRouter(ProfileAPIContainer)

export const ProfileContainer: FC = connector(withUrlDataContainerComponent);

export default ProfileContainer

// В этой компоненте несколько оберток.
// ProfileContainer -> withUrlDataContainerComponent -> ProfileAPIContainer -> Profile  ProfileContainer

// ProfileContainer достаем все необходимое из стора, диспачим и передаем далее.
// withUrlDataContainerComponent здесь достаем данные из url, закидываем их в ProfileAPIContainer.
// В ProfileAPIContainer достаем все нужные данные для Profile и в нее прокидываем.
