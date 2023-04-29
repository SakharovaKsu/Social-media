import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
const Profile = () => {
    return (
        <div className={s.content}>
            <img src='https://catherineasquithgallery.com/uploads/posts/2021-12/1639651365_253-catherineasquithgallery-com-p-fon-akvarel-rozovii-pastelnii-kremovii-419.jpg' />
            <div>
                ava + description
            </div>
            <MyPosts />
        </div>
    )
}

export default Profile;