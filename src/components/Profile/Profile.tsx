import React, {FC} from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostPageType} from "../../redax/state";
const Profile:FC<PostPageType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts postsData={props.postsData}/>
        </div>
    )
}

export default Profile;