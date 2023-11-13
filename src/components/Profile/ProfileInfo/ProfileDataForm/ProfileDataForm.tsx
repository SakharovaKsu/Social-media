import React, { FC } from 'react'
import s from './ProfileDataForm.module.css'
import { useFormik } from 'formik'
import Button from '../../../Elements/Button/Button'
import { useAppDispatch, useAppSelector } from '../../../../redux/reduxStore'
import { ProfileType, saveProfileTC } from '../../../../redux/postPageReducer'
import ProfileContacts from '../ProfileContacts/ProfileContacts'
import { idUserSelector } from '../../../../redux/selectors/authSelector'
import { errorSelector } from '../../../../redux/selectors/appSelector'
import * as Yup from 'yup'

type ProfileDataFormType = {
    profile: ProfileType
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}

const ProfileDataForm: FC<ProfileDataFormType> = ({ profile, editMode, setEditMode }) => {
    const userId = useAppSelector(idUserSelector)
    const error = useAppSelector(errorSelector)
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
        validationSchema: Yup.object({
            fullName: Yup.string().required(),
            lookingForAJobDescription: Yup.string().required(),
            aboutMe: Yup.string().required(),
            facebook: Yup.string().url('Invalid Facebook URL'),
            github: Yup.string().url('Invalid GitHub URL'),
            website: Yup.string().url('Invalid Website URL'),
            twitter: Yup.string().url('Invalid Twitter URL'),
            instagram: Yup.string().url('Invalid Instagram URL'),
            youtube: Yup.string().url('Invalid YouTube URL'),
            vk: Yup.string().url('Invalid VK URL'),
            mainLink: Yup.string().url('Invalid MainLink URL'),
        }),
        onSubmit: (values) => {
            const saveProfile = {
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
            }

            dispatch(saveProfileTC(saveProfile))

            if (!error && !Object.values(formik.errors).some(Boolean)) {
                setEditMode(false)
            }
        },
    })

    return (
        <div className={s.containerForm}>
            <h3 className={s.title}>Edit form</h3>
            <form className={s.boxForm} onSubmit={formik.handleSubmit}>
                <label>
                    <span className={s.text}>Full name:</span>
                    <input className={s.input} type="text" {...formik.getFieldProps('fullName')} />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <span className={s.spanError}>{formik.errors.fullName}</span>
                    )}
                </label>
                <label>
                    <span className={s.text}>Looking for a job:</span>
                    <input className={s.input} type="checkbox" {...formik.getFieldProps('lookingForAJob')} />
                </label>
                <label>
                    <span className={s.text}>My professonal skills:</span>
                    <input className={s.input} type="text" {...formik.getFieldProps('lookingForAJobDescription')} />
                    {formik.touched.lookingForAJobDescription && formik.errors.lookingForAJobDescription && (
                        <span className={s.spanError}>{formik.errors.lookingForAJobDescription}</span>
                    )}
                </label>
                <label>
                    <span className={s.text}>About me:</span>
                    <input className={s.input} type="text" {...formik.getFieldProps('aboutMe')} />
                    {formik.touched.aboutMe && formik.errors.aboutMe && (
                        <span className={s.spanError}>{formik.errors.aboutMe}</span>
                    )}
                </label>
                <div className={s.boxContact}>
                    <ProfileContacts editMode={editMode} formik={formik} />
                </div>
                {error && <span className={s.spanError}>{error}</span>}
                <Button
                    name={'Save'}
                    type={'submit'}
                    color={''}
                    buttonSize={'small'}
                    disabledButton={!!Object.keys(formik.errors).length}
                />
            </form>
        </div>
    )
}

export default ProfileDataForm
