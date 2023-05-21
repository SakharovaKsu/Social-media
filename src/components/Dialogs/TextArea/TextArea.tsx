import React from 'react';
import s from './TextArea.module.css'

const TextArea = (props: any) => {

    const newMessageElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        const text = newMessageElement.current?.value
        //  const text = newPostElement && newPostElement.current && newPostElement.current.value
        alert(text)
    }

    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder="Type your message" ref={newMessageElement}></textarea>
            <button className={s.button} onClick={addPost}>{props.name}</button>
        </div>
    );
};

export default TextArea;