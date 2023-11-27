import React, { FC } from 'react'
import s from './ProfileData.module.css'
import ProfileContacts from '../ProfileContacts/ProfileContacts'
import { ProfileType } from '../../../../common/redux/postPageReducer'
import work from '../../../../images/work.svg'
import notWork from '../../../../images/workFalse.svg'

type ProfileDataType = {
    profile: ProfileType
}

const ProfileData: FC<ProfileDataType> = ({ profile }) => {
    const styleIcons = profile.lookingForAJob === true ? work : notWork

    return (
        <div>
            <div className={s.boxInfo}>
                <h4>A few details about myself</h4>
                <div className={s.container}>
                    <div className={s.box}>
                        <img className={s.icon} src={styleIcons} />
                        <p>{profile.lookingForAJob ? "I'm looking for a job" : 'I"m not looking'}</p>
                    </div>
                    {profile.lookingForAJob && (
                        <div className={s.box}>
                            <p className={s.text}>Skills:</p>
                            <span>{profile.lookingForAJobDescription}</span>
                        </div>
                    )}
                    <div className={s.box}>
                        <p className={s.text}>About me:</p>
                        <span>{profile.aboutMe ? profile.aboutMe : 'No description'}</span>
                    </div>
                </div>
            </div>
            <div className={s.boxContact}>
                <ProfileContacts />
            </div>
        </div>
    )
}

export default ProfileData
