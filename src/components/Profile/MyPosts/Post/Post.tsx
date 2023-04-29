import React from 'react';

type PostType = {
    message: string
    like: number
}
const Post: React.FC<PostType>= (props) => {
    return (
        <div>
            {props.message}
            <div>
                <span>like{props.like}</span>
            </div>
        </div>
    )
}

export default Post;