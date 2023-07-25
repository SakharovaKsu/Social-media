import React, {FC, KeyboardEvent} from 'react';
import Post from "./Post/Post";
import {AllActionType} from '../../../redux/state';
import s from "./MyPosts.module.css";
import {addPostAC, PostPageType, updateNewPostTextAC} from '../../../redux/postPageReducer';

type MyPostsType = {
    postData: PostPageType
    newPostText: string
    dispatch: (action: AllActionType) => void
}

const MyPosts:FC<MyPostsType> = ({postData, newPostText, dispatch}) => {

    const postsElements =
        postData.postsData.map(
            post => <Post key={post.id} message={post.message} likeCount={post.likeCount} id={post.id} src={post.src}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>(); // создаем ссылку и привязываем к textarea

    const newPost = () => {
        dispatch(addPostAC())
    }

    const onPostChange = () => {
        const text = newPostElement.current?.value

        if(text) {
            dispatch(updateNewPostTextAC(text))
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        if (e.key === 'Enter') {
            e.preventDefault();
            if (text.trim()) {
                dispatch(addPostAC())
            }
        }
    };

    return (
        <div>
            <h2 className={s.title}>My post</h2>
            {postsElements}
            <div className={s.wrapper}>
                <textarea className={s.textarea} ref={newPostElement} placeholder={'That tell interesting'} value={newPostText} onChange={onPostChange} onKeyPress={handleKeyPress}/>
                <button className={s.button} onClick={newPost}>Add post</button>
            </div>
        </div>
    )
}

export default MyPosts;