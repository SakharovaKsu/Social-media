import React, {FC} from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

type ProfileType = {
    profile: any
    status: string
    updateStatusTC: (status: string) => void
}

const Profile: FC<ProfileType> = React.memo(({profile, status, updateStatusTC}) => {

    return (
        <div className={s.content}>
            <ProfileInfo profile={profile} status={status} updateStatusTC={updateStatusTC}/>
            <MyPostsContainer/>
        </div>
    )
})

export default Profile;