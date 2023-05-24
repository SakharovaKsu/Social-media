import React, {FC} from "react";
import Post from "./Post/Post";
import {PostPageType} from "../../../redux/state";
import s from "./MyPosts.module.css";

type MyPostsType = {
    postData: PostPageType
    addPost:() => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

const MyPosts:FC<MyPostsType> = ({postData, addPost, newPostText, updateNewPostText}) => {

    const postsElements =
        postData.postsData.map(
            post => <Post message={post.message} likeCount={post.likeCount} id={post.id} src={post.src}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>(); // создаем ссылку и привязываем к textarea

    const newPost = () => {
        addPost()
    }

    const onPostChange = () => {
        const text = newPostElement.current?.value
        updateNewPostText(text ? text : '')
    }

    return (
        <div>
            <h2 className={s.title}>My post</h2>
            {postsElements}
            <div className={s.wrapper}>
                <textarea className={s.textarea} ref={newPostElement} value={newPostText} onChange={onPostChange} />
                <button className={s.button} onClick={newPost}>Add post</button>
            </div>
        </div>
    )
}

export default MyPosts;