import React, {FC} from "react";
import Post from "./Post/Post";
import {AddPropsType, PostPageType, PostsDataType} from "../../../redax/state";


type Props = {
    postsData: PostsDataType[]
    addPost:(postMassage: string) => void
}

const MyPosts:FC<Props> = (props) => {
    const postsElements =
        props.postsData.map(
            post => <Post message={post.message} likeCount={post.likeCount} id={post.id}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>(); // создаем ссылку и привязываем к textarea

    const addPost = () => {
       const text = newPostElement.current?.value
       //  const text = newPostElement && newPostElement.current && newPostElement.current.value
      props.addPost(text ? text : '')
    }

    return (
        <div>
            <h2>My post</h2>
            <textarea ref={newPostElement}></textarea>
            <button onClick={addPost}>Add post</button>
            {postsElements}
        </div>
    )
}

export default MyPosts;