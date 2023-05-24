import React from 'react';
import s from './Post.module.css';

type PostType = {
    id: number
    message: string
    src: string
    likeCount: number
}

const Post: React.FC<PostType>= ({message, likeCount, id, src}) => {
    return (
        <div className={s.wrapper} key={id}>
            <p className={s.text}>{message}</p>
            <img className={s.img} src={src} />
            <span className={s.like}>like {likeCount}</span>
        </div>
    )
}

export default Post;