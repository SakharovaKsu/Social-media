import React, {FC} from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AllActionType} from '../../redux/state';
import {PostPageType} from '../../redux/postPageReducer';

type ProfileType = {
    postData: PostPageType
    dispatch: (action: AllActionType) => void
}
const Profile:FC<ProfileType> = ({postData, dispatch}) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts
                postData={postData}
                newPostText={postData.newPostText}
                dispatch={dispatch}
            />
        </div>
    )
}

export default Profile;