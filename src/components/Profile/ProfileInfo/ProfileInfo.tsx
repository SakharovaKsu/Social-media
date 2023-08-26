import React, {FC} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Elements/Preloader/Preloader';
import {ProfileType} from '../../../redux/postPageReducer';
import work from '../../../images/work.svg'
import notWork from '../../../images/workFalse.svg'
import ProfileContacts from './ProfileContacts/ProfileContacts';


type ProfileInfoType = {
    profile: ProfileType
}

const ProfileInfo:FC<ProfileInfoType> = ({profile}) => {

    // Если Profile null или не определен, то показываем Preloader
    if(!profile) {
        return <Preloader/>
    }

    const styleIcons = profile.lookingForAJob === true ? work : notWork

    const profileContacts = {
        github: profile.contacts.github,
        website: profile.contacts.website,
        twitter: profile.contacts.twitter,
        instagram: profile.contacts.instagram,
        youtube:profile.contacts.youtube,
        vk: profile.contacts.vk,
    }

    return (
        <div className={s.container}>
            <img className={s.picture} src={profile.photos.large}/>
            <div>
                <h2 className={s.title}>{profile.fullName}</h2>
                <p className={s.text}>{profile.aboutMe}</p>

                <div>
                    <h3>Статус работы</h3>
                    <img className={s.icon} src={styleIcons}/>
                    <p>{profile.lookingForAJobDescription}</p>
                </div>

                <ProfileContacts contacts={profileContacts}/>
            </div>
        </div>
    )
}

export default ProfileInfo;