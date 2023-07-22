import React, {ChangeEvent, FC} from 'react';
import s from './TextArea.module.css'
import {addMassageAC, AllActionType, updateNewMessageTextAC} from '../../../redux/state';

type TextAreaType = {
    name: string
    dispatch: (action: AllActionType) => void
    newMessageText: string
}
const TextArea:FC<TextAreaType> = ({name, dispatch,  newMessageText}) => {

    const newMessageElement = React.createRef<HTMLTextAreaElement>();

    const addMessages = () => {
        dispatch(addMassageAC())
    }

    const onMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        // const text = newMessageElement.current?.value
        const text = e.currentTarget.value

        if(text) {
            dispatch(updateNewMessageTextAC(text))
        }
    }

    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder={'Type your message'} ref={newMessageElement} value={newMessageText} onChange={onMessageChange}></textarea>
            <button className={s.button} onClick={addMessages}>{name}</button>
        </div>
    );
};

export default TextArea;