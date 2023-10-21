import React from 'react';
import Header from './Header';
import {connect, ConnectedProps} from 'react-redux';
import {StoreType} from '../../redux/reduxStore';
import {isAuthSelector, loginSelector} from '../../redux/selectors/authSelector';

// Определение типов для пропсов, полученных через connect
type PropsFromRedux = ConnectedProps<typeof connector>

class HeaderContainer extends React.Component<PropsFromRedux> {

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: isAuthSelector(state),
        login: loginSelector(state)
    }

}
const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(HeaderContainer);