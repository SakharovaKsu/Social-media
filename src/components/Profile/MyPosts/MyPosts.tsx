import React, {FC} from 'react';
import Post from "./Post/Post";
import {PostPageType} from "../../../redax/state";

const MyPosts:FC<PostPageType> = (props) => {
    const postsElements = props.postsData.map(post => <Post key={post.id} message={post.message} likeCount={post.likeCount} />)

    return (
        <div>
            My post
            {postsElements}
        </div>
    )
}

export default MyPosts;