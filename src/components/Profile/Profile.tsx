import React, {FC} from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostPageType} from "../../redux/state";

type ProfileType = {
    postData: PostPageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}
const Profile:FC<ProfileType> = ({postData, addPost, updateNewPostText}) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts
                postData={postData}
                addPost={addPost}
                newPostText={postData.newPostText}
                updateNewPostText={updateNewPostText}/>
        </div>
    )
}

export default Profile;