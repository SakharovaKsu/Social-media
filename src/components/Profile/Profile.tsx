import React, { FC } from 'react'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { MyPostsContainer } from './MyPosts/MyPostsContainer'

type ProfileType = {
    profile: any
    status: string
    isOwner: boolean
    updateStatusTC: (status: string) => void
    savePhoto: (photos: File) => void
}

const Profile: FC<ProfileType> = React.memo(({ profile, status, updateStatusTC, isOwner, savePhoto }) => {
    return (
        <div className={s.content}>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatusTC={updateStatusTC}
                isOwner={isOwner}
                savePhoto={savePhoto}
            />
            <MyPostsContainer />
        </div>
    )
})

export default Profile
