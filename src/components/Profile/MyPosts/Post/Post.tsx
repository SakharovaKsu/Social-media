import React from 'react';

// type PostType = {
//     message: string
//     like: number
// }
const Post: React.FC<any>= (props) => {
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