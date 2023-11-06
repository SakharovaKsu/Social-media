import React, { FC } from 'react'
import s from './ProfileDataForm.module.css'
import { useFormik } from 'formik'
import Button from '../../../Elements/Button/Button'
import { useAppDispatch, useAppSelector } from '../../../../redux/reduxStore'
import { ProfileType, saveProfileTC } from '../../../../redux/postPageReducer'
import ProfileContacts from '../ProfileContacts/ProfileContacts'
import { idUserSelector } from '../../../../redux/selectors/authSelector'

type ProfileDataFormType = {
    profile: ProfileType
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}

const ProfileDataForm: FC<ProfileDataFormType> = ({ profile, editMode, setEditMode }) => {
    const userId = useAppSelector(idUserSelector)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            aboutMe: profile.aboutMe || '',
            facebook: profile.contacts.facebook || '',
            github: profile.contacts.github || '',
            website: profile.contacts.website || '',
            twitter: profile.contacts.twitter || '',
            instagram: profile.contacts.instagram || '',
            youtube: profile.contacts.youtube || '',
            vk: profile.contacts.vk || '',
            mainLink: profile.contacts.mainLink || '',
            lookingForAJob: profile.lookingForAJob || false,
            lookingForAJobDescription: profile.lookingForAJobDescription || '',
            fullName: profile.fullName || '',
        },
        onSubmit: (values) => {
            dispatch(
                saveProfileTC({
                    aboutMe: values.aboutMe,
                    userId: userId || 0,
                    lookingForAJob: values.lookingForAJob,
                    lookingForAJobDescription: values.lookingForAJobDescription,
                    fullName: values.fullName,
                    contacts: {
                        facebook: values.facebook,
                        github: values.github,
                        website: values.website,
                        twitter: values.twitter,
                        instagram: values.instagram,
                        youtube: values.youtube,
                        vk: values.vk,
                        mainLink: values.mainLink,
                    },
                }),
            )
            setEditMode(false)
        },
    })

    return (
        <div className={s.containerForm}>
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
                    <ProfileContacts editMode={editMode} formik={formik} />
                </div>
                <Button name={'Save'} type={'submit'} color={''} buttonSize={'small'} />
            </form>
        </div>
    )
}

export default ProfileDataForm
