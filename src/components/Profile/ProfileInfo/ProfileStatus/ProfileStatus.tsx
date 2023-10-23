import React, { ChangeEvent, FC, useEffect, useState } from 'react'

type ProfileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileStatus: FC<ProfileStatusType> = ({ status, updateStatusTC }) => {
    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)

    // условие обязательно делать, что б не было зацикленности при рендере
    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatusTC(localStatus)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode && (
                <div>
                    <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
                </div>
            )}
            {editMode && (
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={localStatus} />
                </div>
            )}
        </div>
    )
}

export default ProfileStatus
