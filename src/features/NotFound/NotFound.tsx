import React from 'react'
import error from '../../images/404.svg'
import s from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={s.container}>
            <h2 className={s.title}>NOT FOUND</h2>
            <img className={s.picture} src={error} alt={'Картинка 404.'} />
        </div>
    )
}

export default NotFound
