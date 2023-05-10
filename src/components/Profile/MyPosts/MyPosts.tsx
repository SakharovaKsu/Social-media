import React from 'react';
import Post from "./Post/Post";

const MyPosts = (props:any) => {
    const postsElements = props.postsData.map((post:any) => <Post key={post.id} message={post.message} likeCount={post.lireCount} />)

    return (
        <div>
            My post
            {postsElements}
        </div>
    )
}

export default MyPosts;