import React, { FC } from 'react'
import s from './ProfileContacts.module.css'
import websiteImg from '../../../../images/icons/icons-website.svg'
import vkImg from '../../../../images/icons/icons-vk.svg'
import twitterImg from '../../../../images/icons/icons-twitter.svg'
import instagramImg from '../../../../images/icons/icons-instagram.svg'
import youtubeImg from '../../../../images/icons/icons-youtube.svg'
import githubImg from '../../../../images/icons/icons-github.svg'
import { ContactLink } from '../../../Elements/ContactLink/ContactLink'

type ProfileContactsType = {
    formik?: any
    editMode?: boolean
}

const ProfileContacts: FC<ProfileContactsType> = ({ editMode, formik }) => {
    console.log('formikContacts', formik?.values)
    // const contactValues = formik?.values?.contacts || {}
    // console.log('contactValues', contactValues)

    const contactLinks = [
        { name: 'github', url: formik?.values?.github, imgSrc: githubImg },
        { name: 'website', url: formik?.values?.website, imgSrc: websiteImg },
        { name: 'twitter', url: formik?.values?.twitter, imgSrc: twitterImg },
        { name: 'instagram', url: formik?.values?.instagram, imgSrc: instagramImg },
        { name: 'youtube', url: formik?.values?.youtube, imgSrc: youtubeImg },
        { name: 'vk', url: formik?.values?.vk, imgSrc: vkImg },
    ]
    console.log('contactLinks', contactLinks)

    const styles = !editMode ? s.container : s.containerInput

    return (
        <div className={styles}>
            {editMode && <h4>Contacts:</h4>}
            {!editMode
                ? contactLinks.map((link, index) => <ContactLink key={index} url={link.url} imgSrc={link.imgSrc} />)
                : contactLinks.map((link, index) => (
                      <label key={index}>
                          <span className={s.nameInput}>{link.name}</span>
                          <input className={s.input} type={'text'} {...formik.getFieldProps(link.name)} />
                      </label>
                  ))}
        </div>
    )
}

export default ProfileContacts
