import React, { FC } from 'react'
import s from './ProfileContacts.module.css'
import websiteImg from '../../../../images/icons/icons-website.svg'
import vkImg from '../../../../images/icons/icons-vk.svg'
import twitterImg from '../../../../images/icons/icons-twitter.svg'
import instagramImg from '../../../../images/icons/icons-instagram.svg'
import youtubeImg from '../../../../images/icons/icons-youtube.svg'
import githubImg from '../../../../images/icons/icons-github.svg'
import { ContactsSelector } from '../../../../common/redux/selectors/postPageSelector'
import { useAppSelector } from '../../../../common/redux/store'

type ProfileContactsType = {
    formik?: any
    editMode?: boolean
}

const ProfileContacts: FC<ProfileContactsType> = ({ editMode, formik }) => {
    const contacts = useAppSelector(ContactsSelector)

    const contactLinks = [
        { name: 'github', url: contacts.github, imgSrc: githubImg },
        { name: 'website', url: contacts.website, imgSrc: websiteImg },
        { name: 'twitter', url: contacts.twitter, imgSrc: twitterImg },
        { name: 'instagram', url: contacts.instagram, imgSrc: instagramImg },
        { name: 'youtube', url: contacts.youtube, imgSrc: youtubeImg },
        { name: 'vk', url: contacts.vk, imgSrc: vkImg },
    ]

    const styles = !editMode ? s.container : s.containerInput

    return (
        <div className={styles}>
            {editMode && <h4>Contacts:</h4>}
            {!editMode
                ? contactLinks.map((link, index) => {
                      return (
                          <>
                              {link.url && (
                                  <a key={index} className={s.link} href={link.url ? link.url : undefined}>
                                      <img className={s.icon} src={link.imgSrc} />
                                  </a>
                              )}
                          </>
                      )
                  })
                : contactLinks.map((link, index) => (
                      <label key={index}>
                          <span className={s.nameInput}>{link.name}</span>
                          <input
                              className={s.input}
                              type={'text'}
                              {...formik.getFieldProps(link.name)}
                              error={formik.touched[link.name] && formik.errors[link.name]}
                          />
                          {formik.touched[link.name] && formik.errors[link.name] && (
                              <span className={s.spanError}>{formik.errors[link.name]}</span>
                          )}
                      </label>
                  ))}
        </div>
    )
}

export default ProfileContacts
