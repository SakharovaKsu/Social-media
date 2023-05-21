import React, {FC} from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AddPropsType} from "../../redax/state";
const Profile:FC<AddPropsType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts
                postsData={props.state.postPage.postsData}
                addPost={props.addPosts}/>
        </div>
    )
}

export default Profile;