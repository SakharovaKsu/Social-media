import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import {PostsDataType} from '../../../redux/postPageReducer';

type MyPostsType = {
    postData: PostsDataType[]
    newPostText: string
    newPostCallback: () => void
    onPostChangeCallback: (text: string) => void
}

const MyPosts:FC<MyPostsType> = ({postData, newPostText, newPostCallback, onPostChangeCallback}) => {

    const postsElements =
        postData.map(
            post => <Post key={post.id} message={post.message} likeCount={post.likeCount} id={post.id} src={post.src}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>(); // создаем ссылку и привязываем к textarea

    const newPost = () => {
        newPostCallback()
    }

    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value

        if(text) {
            onPostChangeCallback(text)
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        if (e.key === 'Enter') {
            e.preventDefault();
            if (text.trim()) {
                newPostCallback()
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