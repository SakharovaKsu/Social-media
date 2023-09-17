import React from 'react';
import Header from './Header';
import {connect, ConnectedProps} from 'react-redux';
import {setAuthTC} from '../../redux/authReducer';
import {StoreType} from '../../redux/reduxStore';

// Определение типов для пропсов, полученных через connect
type PropsFromRedux = ConnectedProps<typeof connector>

class HeaderContainer extends React.Component<PropsFromRedux> {

    componentDidMount() {
        // сетаем логин
        this.props.setAuthTC()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }

}
const mapDispatchToProps = {setAuthTC}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(HeaderContainer);