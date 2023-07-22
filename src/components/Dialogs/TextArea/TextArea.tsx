import React, {FC} from 'react';
import s from './TextArea.module.css'
import {addMassageAC, AllActionType} from '../../../redux/state';

type TextAreaType = {
    name: string
    dispatch: (action: AllActionType) => void
}
const TextArea:FC<TextAreaType> = ({name, dispatch}) => {

    const newMessageElement = React.createRef<HTMLTextAreaElement>();

    const addMessages = () => {

        const text = newMessageElement.current?.value

        if(text) {
            dispatch(addMassageAC(text))
        }
    }

    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder="Type your message" ref={newMessageElement}></textarea>
            <button className={s.button} onClick={addMessages}>{name}</button>
        </div>
    );
};

export default TextArea;