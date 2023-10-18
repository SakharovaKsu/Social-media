import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import s from './TextArea.module.css'
import Button from '../../Elements/Button/Button';
import {useFormik} from 'formik';
import {validateMessage} from '../../../utils/validate';

type TextAreaType = {
    name: string
    addMessagesCallback: () => void
    updateNewMessageTextCallback: (text: string) => unknown
    placeholder: string
}

export type FormValuesType = {
    message: string
}

const MAX_MESSAGE_LENGTH = 3

const TextArea:FC<TextAreaType> = ({name, addMessagesCallback, updateNewMessageTextCallback, placeholder}) => {

    const formik = useFormik({
        initialValues: {
            message: '',
        } as FormValuesType,
        validate: (values) => {

            let errors: { message?: string } = {}
            const validationMessage = validateMessage(MAX_MESSAGE_LENGTH, values.message)

            if (validationMessage) {
                errors.message = validationMessage
            }
            return errors
        },
        onSubmit: values => {
            updateNewMessageTextCallback(values.message)
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
        <form className={s.wrapper} onSubmit={formik.handleSubmit}>
    <textarea
        className={s.textArea}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        {...formik.getFieldProps('message')}>
    </textarea>
            {formik.touched.message && formik.errors.message && (
                <span className={s.error}>{formik.errors.message}</span>
            )}
            <Button color={'blue'} name={name} type='submit' />
        </form>
    )
};

export default TextArea;