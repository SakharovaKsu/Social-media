import React, {FC} from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { PostsDataType} from "../../redux/state";

type Props = {
    postsData: PostsDataType[]
    addPost: (postMassage: string) => void
}
const Profile:FC<Props> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts
                postsData={props.postsData}
                addPost={props.addPost}/>
        </div>
    )
}

export default Profile;