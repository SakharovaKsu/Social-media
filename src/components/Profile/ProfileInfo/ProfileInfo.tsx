import React, { ChangeEvent, FC } from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../Elements/Preloader/Preloader'
import { ProfileType } from '../../../redux/postPageReducer'
import work from './../../../images/work.svg'
import notWork from './../../../images/workFalse.svg'
import ProfileContacts from './ProfileContacts/ProfileContacts'
import user1 from '../../../images/avatar-user/user-1.svg'
import ProfileStatus from './ProfileStatus/ProfileStatus'

type ProfileInfoType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatusTC: (status: string) => void
    savePhoto: (photos: File) => void
}

const ProfileInfo: FC<ProfileInfoType> = React.memo(({ profile, status, updateStatusTC, isOwner, savePhoto }) => {
    // Если Profile null или не определен, то показываем Preloader
    if (!profile) {
        return <Preloader />
    }

    const styleIcons = profile.lookingForAJob === true ? work : notWork

    const profileContacts = {
        github: profile.contacts.github,
        website: profile.contacts.website,
        twitter: profile.contacts.twitter,
        instagram: profile.contacts.instagram,
        youtube: profile.contacts.youtube,
        vk: profile.contacts.vk,
    }

    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length) savePhoto(e.currentTarget.files[0])
    }

    return (
        <div className={s.container}>
            <img className={s.picture} src={profile.photos.large ? profile.photos.large : user1} />
            <div className={s.containerInfo}>
                <h2 className={s.title}>{profile.fullName}</h2>
                <p className={s.text}>{profile.aboutMe}</p>
                {isOwner ? (
                    <label className={s.customInputPhoto}>
                        <input className={s.inputPhoto} type={'file'} onChange={onMainPhotoSelector} />
                    </label>
                ) : (
                    ''
                )}
            </div>
            <div className={s.boxInfo}>
                <h3 className={s.subTitle}>Work status</h3>
                <div className={s.box}>
                    <img className={s.icon} src={styleIcons} />
                    <p>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : 'I"m not looking'}</p>
                </div>
            </div>
            <div className={s.boxContact}>
                <ProfileContacts contacts={profileContacts} />
            </div>
            <div className={s.boxStatus}>
                <ProfileStatus status={status} updateStatusTC={updateStatusTC} />
            </div>
        </div>
    )
})

export default ProfileInfo
