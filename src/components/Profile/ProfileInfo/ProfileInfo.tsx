import React, { ChangeEvent, FC, useState } from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../Elements/Preloader/Preloader'
import { ProfileType, savePhotoTC } from '../../../redux/postPageReducer'
import user1 from '../../../images/avatar-user/user-1.svg'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfileData from './ProfileData/ProfileData'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import ButtonSmall from '../../Elements/ButtonSmall/ButtonSmall'
import { useAppDispatch, useAppSelector } from '../../../redux/reduxStore'
import { photoUserSelector } from '../../../redux/selectors/postPageSelector'

type ProfileInfoType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatusTC: (status: string) => void
}

const ProfileInfo: FC<ProfileInfoType> = React.memo(({ profile, status, updateStatusTC, isOwner }) => {
    const dispatch = useAppDispatch()

    const photo = useAppSelector(photoUserSelector)
    console.log(photo)
    const [editMode, setEditMode] = useState(false)

    // Если Profile null или не определен, то показываем Preloader
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length) dispatch(savePhotoTC(e.currentTarget.files[0]))
    }

    const HandlerButtonToggleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <div className={s.container}>
            <img className={s.picture} src={photo.large ? photo.large : user1} />
            <div className={s.containerInfo}>
                <div className={s.boxTitle}>
                    <h2>{profile.fullName}</h2>
                    {editMode ? (
                        <ButtonSmall name={'Save'} type={'submit'} callback={HandlerButtonToggleEditMode} />
                    ) : (
                        <ButtonSmall name={'Edit'} type={'submit'} callback={HandlerButtonToggleEditMode} />
                    )}
                </div>
                <ProfileStatus status={status} updateStatusTC={updateStatusTC} />
                {isOwner ? (
                    <label className={s.customInputPhoto}>
                        <input className={s.inputPhoto} type={'file'} onChange={onMainPhotoSelector} />
                    </label>
                ) : (
                    ''
                )}
            </div>
            {editMode ? (
                <ProfileDataForm profile={profile} editMode={editMode} />
            ) : (
                <ProfileData profile={profile} editMode={editMode} />
            )}
        </div>
    )
})

export default ProfileInfo
