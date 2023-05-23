import React from 'react';

type PostType = {
    id: number
    message: string
    likeCount: number
}
const Post: React.FC<PostType>= ({message, likeCount, id}) => {
    return (
        <div key={id}>
            {message}
            <div>
                <span>like{likeCount}</span>
            </div>
        </div>
    )
}

export default Post;