import React from 'react';
import Header from './Header';
import {connect, ConnectedProps} from 'react-redux';
import {setUserDataAC} from '../../redux/authReducer';
import {StoreType} from '../../redux/reduxStore';
import {usersApi} from '../../api/api';

// Определение типов для пропсов, полученных через connect
type PropsFromRedux = ConnectedProps<typeof connector>

class HeaderContainer extends React.Component<PropsFromRedux> {
    componentDidMount() {

        usersApi.getAuth()
            .then(response => {
                if(response.data.resultCode === 0) {
                    this.props.setUserData(response.data.data)
                }
            })
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
const mapDispatchToProps = {
    setUserData: setUserDataAC
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(HeaderContainer);