import React, {FC} from 'react';
import s from './TextArea.module.css'

type TextAreaType = {
    name: string
    dispatch: (action: any) => void
    // addMessage: (message: string) => void
}
const TextArea:FC<TextAreaType> = ({name, dispatch}) => {

    const newMessageElement = React.createRef<HTMLTextAreaElement>();

    const addMessages = () => {
        const text = newMessageElement.current?.value
        const action = {type: 'ADD-MESSAGE', massage: text}

        if(text) {
            dispatch(action)
        }
        // dispatch({type: 'ADD-MESSAGE', massage: text})
        // props.addMessage(text ? text : '')
    }

    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder="Type your message" ref={newMessageElement}></textarea>
            <button className={s.button} onClick={addMessages}>{name}</button>
        </div>
    );
};

export default TextArea;