import React, { FC } from 'react'
import s from './ProfileData.module.css'
import ProfileContacts from '../ProfileContacts/ProfileContacts'
import { ProfileType } from '../../../../redux/postPageReducer'
import work from '../../../../images/work.svg'
import notWork from '../../../../images/workFalse.svg'

type ProfileDataType = {
    profile: ProfileType
    editMode: boolean
}

const ProfileData: FC<ProfileDataType> = ({ profile, editMode }) => {
    const styleIcons = profile.lookingForAJob === true ? work : notWork

    return (
        <div>
            <div className={s.boxInfo}>
                <h3>Work status</h3>
                <div className={s.box}>
                    <img className={s.icon} src={styleIcons} />
                    <p>{profile.lookingForAJob ? "I'm looking for a job" : 'I"m not looking'}</p>
                    {profile.lookingForAJob && (
                        <div>
                            <p className={s.text}>My professonal skills:</p>
                            <span>{profile.lookingForAJobDescription}</span>
                        </div>
                    )}
                </div>
                <div>
                    <p className={s.text}>About me:</p>
                    <span>{profile.aboutMe ? profile.aboutMe : 'No description'}</span>
                </div>
            </div>
            {/*<div className={s.boxContact}>*/}
            {/*    <ProfileContacts profile={profile} editMode={editMode} />*/}
            {/*</div>*/}
        </div>
    )
}

export default ProfileData
