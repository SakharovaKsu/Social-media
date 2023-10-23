import React, { FC } from 'react'
import s from './ProfileContacts.module.css'
import website from '../../../../images/icons/icons-website.svg'
import vk from '../../../../images/icons/icons-vk.svg'
import twitter from '../../../../images/icons/icons-twitter.svg'
import instagram from '../../../../images/icons/icons-instagram.svg'
import youtube from '../../../../images/icons/icons-youtube.svg'
import github from '../../../../images/icons/icons-github.svg'
import { ContactLink, ContactLinkType } from '../../../Elements/ContactLink/ContactLink'

type ProfileContactsType = {
    github: string | null
    website: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    vk: string | null
}

type ProfileType = {
    contacts: ProfileContactsType
}

const ProfileContacts: FC<ProfileType> = ({ contacts }) => {
    const contactLinks: ContactLinkType[] = [
        { url: contacts.github, imgSrc: github },
        { url: contacts.website, imgSrc: website },
        { url: contacts.twitter, imgSrc: twitter },
        { url: contacts.instagram, imgSrc: instagram },
        { url: contacts.youtube, imgSrc: youtube },
        { url: contacts.vk, imgSrc: vk },
    ]

    return (
        <div className={s.container}>
            {contactLinks.map((link, index) => (
                <ContactLink key={index} url={link.url} imgSrc={link.imgSrc} />
            ))}
        </div>
    )
}

export default ProfileContacts
