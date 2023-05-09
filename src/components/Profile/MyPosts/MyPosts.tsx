import React, {FC} from 'react';
import Post from "./Post/Post";

type PostDataType = {
    id: number
    message: string
    lireCount: number
}
const MyPosts = () => {
    let postData:PostDataType[] = [
        {id: 1, message: 'Hi', lireCount: 4},
        {id: 2, message: 'Good', lireCount: 22},
    ]

    const postsElements = postData.map(posts => <Post message={posts.message} likeCount={posts.lireCount} />)

    return (
        <div>
            My post
            {postsElements}
        </div>
    )
}

export default MyPosts;