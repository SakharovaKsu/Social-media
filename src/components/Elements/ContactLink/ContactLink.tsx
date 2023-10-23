import React, { FC } from 'react'
import s from './ContactLink.module.css'

export type ContactLinkType = {
    url: string | null
    imgSrc: string
}

export const ContactLink: FC<ContactLinkType> = ({ url, imgSrc }) => {
    if (!url) {
        return null
    }

    return (
        <a className={s.link} href={url}>
            <img className={s.icon} src={imgSrc} />
        </a>
    )
}
