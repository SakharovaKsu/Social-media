import React, {FC} from 'react';
import s from './TextArea.module.css'

type TextAreaType = {
    name: string
    addMessage: (message: string) => void
}
const TextArea:FC<TextAreaType> = (props) => {

    const newMessageElement = React.createRef<HTMLTextAreaElement>();

    const addMessages = () => {
        const text = newMessageElement.current?.value
        //  const text = newPostElement && newPostElement.current && newPostElement.current.value
        props.addMessage(text ? text : '')
    }

    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder="Type your message" ref={newMessageElement}></textarea>
            <button className={s.button} onClick={addMessages}>{props.name}</button>
        </div>
    );
};

export default TextArea;