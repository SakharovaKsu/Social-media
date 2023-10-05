import React, {ComponentType} from 'react';
import {Redirect} from 'react-router-dom';
import {StoreType} from '../redux/reduxStore';
import {connect} from 'react-redux';

// Хок проверяем залогинены или нет, если да то видим диалоги, профайл, если нет, то перенаправляет на логин

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {
        // restProps остаточные пропсы
        let {isAuth, ...restProps} = props
        debugger

        if(!isAuth) return <Redirect to={'/login'}/>

        return (<Component {...restProps as T}/>)
    }

    const ConnectAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectAuthRedirectComponent
}