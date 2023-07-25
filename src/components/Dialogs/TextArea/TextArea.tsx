import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import s from './TextArea.module.css'
import {AllActionType} from '../../../redux/state';
import {addMassageAC, updateNewMessageTextAC} from '../../../redux/dialogsReducer';

type TextAreaType = {
    name: string
    dispatch: (action: AllActionType) => void
    newMessageText: string
}
const TextArea:FC<TextAreaType> = ({name, dispatch,  newMessageText}) => {

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

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value

        if (e.key === 'Enter') {
            e.preventDefault();
            if (text.trim()) {
                dispatch(addMassageAC());
            }
        }
    };

    return (
        <div className={s.wrapper}>
            <textarea className={s.textArea} placeholder={'Type your message'} value={newMessageText} onChange={onMessageChange} onKeyPress={handleKeyPress}></textarea>
            <button className={s.button} onClick={addMessages}>{name}</button>
        </div>
    );
};

export default TextArea;