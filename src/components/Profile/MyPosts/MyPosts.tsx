import React from 'react';
import Post from "./Post/Post";

const MyPosts= () => {
    return (
        <div>
            My post
            <Post message='Hi' like='10' />
            <Post message='Good' like='6' />
        </div>
    )
}

export default MyPosts;