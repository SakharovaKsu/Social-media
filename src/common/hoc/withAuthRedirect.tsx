import React, { ComponentType } from 'react'
import { Redirect } from 'react-router-dom'
import { StoreType } from '../redux/store'
import { connect } from 'react-redux'
import { isAuthSelector } from '../redux/selectors/authSelector'

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: isAuthSelector(state),
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsType) => {
        // restProps остаточные пропсы
        let { isAuth, ...restProps } = props

        if (!isAuth) return <Redirect to={'/login'} />

        return <Component {...(restProps as T)} />
    }

    const ConnectAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectAuthRedirectComponent
}
