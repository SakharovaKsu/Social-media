import React, {FC} from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import MyPostsContainer from './MyPosts/MyPostsContainer';
import {StoreType} from '../../redux/redux-store';

type ProfileType = {
    store: StoreType
}
const Profile:FC<ProfileType> = ({store}) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPostsContainer store={store}/>
        </div>
    )
}

export default Profile;