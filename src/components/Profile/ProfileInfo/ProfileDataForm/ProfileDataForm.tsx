import React, { FC } from 'react'
import s from './ProfileDataForm.module.css'
import { useFormik } from 'formik'
import Button from '../../../Elements/Button/Button'
import { useAppDispatch } from '../../../../redux/reduxStore'
import { ProfileType, saveProfileTC } from '../../../../redux/postPageReducer'
import ProfileContacts from '../ProfileContacts/ProfileContacts'

type ProfileDataFormType = {
    editMode: boolean
    profile: ProfileType
}

const ProfileDataForm: FC<ProfileDataFormType> = ({ editMode, profile }) => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            aboutMe: '',
            contacts: {
                facebook: '',
                github: '',
                website: '',
                twitter: '',
                instagram: '',
                youtube: '',
                vk: '',
                mainLink: '',
            },
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: '',
            userId: 29405,
        },
        onSubmit: (values) => {
            dispatch(saveProfileTC(values))
        },
    })

    return (
        <div>
            <h3 className={s.title}>Edit form</h3>
            <form className={s.boxForm} onSubmit={formik.handleSubmit}>
                <label>
                    <span className={s.text}>Full name:</span>
                    <input className={s.input} type="text" {...formik.getFieldProps('fullName')} />
                </label>
                <label>
                    <span className={s.text}>Looking for a job:</span>
                    <input className={s.input} type="checkbox" {...formik.getFieldProps('lookingForAJob')} />
                </label>
                <label>
                    <span className={s.text}>My professonal skills:</span>
                    <input className={s.input} type="text" {...formik.getFieldProps('lookingForAJobDescription')} />
                </label>
                <label>
                    <span className={s.text}>About me:</span>
                    <input className={s.input} type="text" {...formik.getFieldProps('aboutMe')} />
                </label>
                <div className={s.boxContact}>
                    <ProfileContacts
                        profile={profile}
                        editMode={editMode}
                        contactValues={formik.initialValues.contacts}
                    />
                </div>
                <Button name={'Save'} type={'submit'} color={''} buttonSize={'small'} />
            </form>
        </div>
    )
}

export default ProfileDataForm
