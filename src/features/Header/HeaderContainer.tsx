import React from 'react'
import Header from './Header'
import { connect, ConnectedProps } from 'react-redux'
import { StoreType } from '../../common/redux/store'
import { isAuthSelector, loginSelector } from '../../common/redux/selectors/authSelector'

type PropsFromRedux = ConnectedProps<typeof connector>

class HeaderContainer extends React.Component<PropsFromRedux> {
    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} />
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: isAuthSelector(state),
        login: loginSelector(state),
    }
}
const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(HeaderContainer)
