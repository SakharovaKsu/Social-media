import React, { ChangeEvent, FC, useCallback } from 'react'
import Post from './Post/Post'
import s from './MyPosts.module.css'
import { PostPageType } from '../../../common/redux/postPageReducer'
import TextArea from '../../Dialogs/TextArea/TextArea'

type MyPostsType = {
    postPage: PostPageType
    newPostCallback: () => void
    onPostChangeCallback: (text: string) => void
}

const MyPosts: FC<MyPostsType> = React.memo(({ postPage, newPostCallback, onPostChangeCallback }) => {
    const postsElements = postPage.postsData.map((post) => (
        <Post key={post.id} message={post.message} likeCount={post.likeCount} id={post.id} src={post.src} />
    ))

    const newPost = useCallback(() => {
        newPostCallback()
    }, [])

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value

        if (text) {
            onPostChangeCallback(text)
        }
    }

    return (
        <div>
            <h2 className={s.title}>My post</h2>
            {postsElements}
            <div className={s.wrapper}>
                <TextArea
                    name={'Add post'}
                    addTextCallback={newPost}
                    updateTextCallback={onPostChangeCallback}
                    placeholder={'That tell interesting'}
                />
            </div>
        </div>
    )
})

export default MyPosts
