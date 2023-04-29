import React from 'react';

const Post= (props: any) => {
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