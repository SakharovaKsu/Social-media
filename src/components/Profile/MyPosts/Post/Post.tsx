import React from 'react';
import {PostsDataType} from "../../../../redax/state";
const Post: React.FC<PostsDataType>= (props) => {
    return (
        <div>
            {props.message}
            <div>
                <span>like {props.likeCount}</span>
            </div>
        </div>
    )
}

export default Post;