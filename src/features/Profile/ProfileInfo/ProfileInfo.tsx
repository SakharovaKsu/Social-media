import React, { ChangeEvent, FC, useState } from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../Elements/Preloader/Preloader'
import { ProfileType, savePhotoTC } from '../../../common/redux/postPageReducer'
import user1 from '../../../images/avatar-user/user-1.svg'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfileData from './ProfileData/ProfileData'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import ButtonSmall from '../../Elements/ButtonSmall/ButtonSmall'
import { useAppDispatch, useAppSelector } from '../../../common/redux/store'
import { photoUserSelector } from '../../../common/redux/selectors/postPageSelector'

type ProfileInfoType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatusTC: (status: string) => void
}

const ProfileInfo: FC<ProfileInfoType> = React.memo(({ profile, status, updateStatusTC, isOwner }) => {
    const dispatch = useAppDispatch()

    const photo = useAppSelector(photoUserSelector)

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

    const styleContainer = !editMode ? s.containerInfo : s.containerInfoForm

    const buttonEdit = isOwner ? (
        editMode ? (
            <ButtonSmall name={'Save'} type={'submit'} callback={HandlerButtonToggleEditMode} />
        ) : (
            <ButtonSmall name={'Edit'} type={'submit'} callback={HandlerButtonToggleEditMode} />
        )
    ) : (
        ''
    )

    return (
        <div className={s.container + ' ' + styleContainer}>
            <img className={s.picture} src={photo?.large ? photo.large : user1} />
            <div className={s.containerInfo}>
                <div className={s.boxTitle}>
                    <h2>{profile.fullName}</h2>
                    {buttonEdit}
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
                <ProfileDataForm profile={profile} editMode={editMode} setEditMode={setEditMode} />
            ) : (
                <ProfileData profile={profile} />
            )}
        </div>
    )
})

export default ProfileInfo
