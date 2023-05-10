import React, {FC} from 'react';
import Post from "./Post/Post";
import {PostPageType} from "../../../redax/state";

const MyPosts:FC<PostPageType> = (props) => {
    const postsElements = props.postsData.map(post => <Post message={post.message} likeCount={post.likeCount}  id={post.id}/>)

    return (
        <div>
            My post
            {postsElements}
        </div>
    )
}

export default MyPosts;