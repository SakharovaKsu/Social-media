import React, {FC} from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect, ConnectedProps} from 'react-redux';
import {StoreType} from '../../redux/redux-store';
import {setUserProfileAC} from '../../redux/postPageReducer';

type ProfileContainerType = ConnectedProps<typeof connector>;

class ProfileAPIContainer extends React.Component<ProfileContainerType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export const ProfileContainer: FC = connector(ProfileAPIContainer);

export default ProfileContainer