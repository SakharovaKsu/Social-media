import React, {FC} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Elements/Preloader/Preloader';

type ProfileInfoType = {
    profile: any
}

const ProfileInfo:FC<ProfileInfoType> = ({profile}) => {
    debugger

    // Если Profile null или не определен, то показываем Preloader
    if(!profile) {
        return <Preloader/>
    }

    return (
        <div>
            ava + description
            <img src={profile.photos.large}/>
        </div>
    )
}

export default ProfileInfo;