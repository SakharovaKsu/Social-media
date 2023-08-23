import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import {PostPageType} from '../../../redux/postPageReducer';
import Button from '../../Elements/Button/Button';

type MyPostsType = {
    postPage: PostPageType
    newPostCallback: () => void
    onPostChangeCallback: (text: string) => void
}

const MyPosts:FC<MyPostsType> = ({postPage, newPostCallback, onPostChangeCallback}) => {

    const postsElements =
        postPage.postsData.map(
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
                <textarea className={s.textarea} ref={newPostElement} placeholder={'That tell interesting'} value={postPage.newPostText} onChange={onPostChange} onKeyPress={handleKeyPress}/>
                <Button callback={newPost} name={'Add post'} color={'blue'}/>
            </div>
        </div>
    )
}

export default MyPosts;