import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import s from './TextArea.module.css'
import Button from '../../Elements/Button/Button';
import {useFormik} from 'formik';

type TextAreaType = {
    name: string
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => void
}

const MAX_MESSAGE_LENGTH = 1000

const TextArea:FC<TextAreaType> = ({name, addMessagesCallback, updateNewMessageTextCallback}) => {

    const formik = useFormik({
        initialValues: {
            values: '',
        },
        validate: (values) => {
            let errorMessage = {}
            if (!values.values.trim()) {
                errorMessage = 'Message cannot be empty';
            } else if (values.values.length > MAX_MESSAGE_LENGTH) {
                errorMessage = `\`Message cannot be longer than ${MAX_MESSAGE_LENGTH} characters`;
            }
            return errorMessage
        },
        onSubmit: values => {
            updateNewMessageTextCallback(values.values)
            addMessagesCallback()

            // очищаем форму после отправки
            formik.resetForm()
        },
    })

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formik.handleSubmit();
        }
    }

    return (
        <div className={s.wrapper}>
            <form onSubmit={formik.handleSubmit}>
                <textarea className={s.textArea}
                          placeholder={'Type your message'}
                          onKeyPress={handleKeyPress}
                          {...formik.getFieldProps('values')}></textarea>
                <Button color={'blue'} name={name} type='submit'/>
            </form>
        </div>
    );
};

export default TextArea;