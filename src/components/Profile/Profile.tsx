import React, {FC} from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

type ProfileType = {
    profile: any
}

const Profile: FC<ProfileType> = ({profile}) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile={profile} />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;