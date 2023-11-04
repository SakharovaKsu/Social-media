import React, { FC } from 'react'
import s from './ProfileContacts.module.css'
import websiteImg from '../../../../images/icons/icons-website.svg'
import vkImg from '../../../../images/icons/icons-vk.svg'
import twitterImg from '../../../../images/icons/icons-twitter.svg'
import instagramImg from '../../../../images/icons/icons-instagram.svg'
import youtubeImg from '../../../../images/icons/icons-youtube.svg'
import githubImg from '../../../../images/icons/icons-github.svg'
import { ContactLink } from '../../../Elements/ContactLink/ContactLink'
import { ProfileType, saveProfileTC } from '../../../../redux/postPageReducer'
import { useFormik } from 'formik'

type ProfileContactsType = {
    profile: ProfileType
    editMode?: boolean
    contactValues: {
        [key: string]: string
    }
}

const ProfileContacts: FC<ProfileContactsType> = ({ profile, editMode, contactValues }) => {
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
            userId: null,
        },
        onSubmit: (values) => {},
    })

    const contactLinks = [
        { name: 'github', url: profile.contacts.github, imgSrc: githubImg },
        { name: 'website', url: profile.contacts.website, imgSrc: websiteImg },
        { name: 'twitter', url: profile.contacts.twitter, imgSrc: twitterImg },
        { name: 'instagram', url: profile.contacts.instagram, imgSrc: instagramImg },
        { name: 'youtube', url: profile.contacts.youtube, imgSrc: youtubeImg },
        { name: 'vk', url: profile.contacts.vk, imgSrc: vkImg },
    ]

    const styles = !editMode ? s.container : s.containerInput

    return (
        <div className={styles}>
            {editMode && <h4>Contacts:</h4>}
            {!editMode
                ? contactLinks.map((link, index) => <ContactLink key={index} url={link.url} imgSrc={link.imgSrc} />)
                : contactLinks.map((link, index) => (
                      <label key={index}>
                          <span className={s.nameInput}>{link.name}</span>
                          <input
                              className={s.input}
                              type={'text'}
                              // value={contactValues[link.name]}
                              {...formik.getFieldProps(`contacts.${link.name}`)}
                              // onChange={(e) => formik.setFieldValue(`contacts.${link.name}`, e.target.value)}
                          />
                      </label>
                  ))}
        </div>
    )
}

export default ProfileContacts
