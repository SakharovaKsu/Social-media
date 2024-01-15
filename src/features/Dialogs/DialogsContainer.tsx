import React from 'react'
import { addMassage, updateNewMessageText } from '../../common/redux/dialogsReducer'
import { StoreType } from '../../common/redux/store'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../common/hoc/withAuthRedirect'

const mapStateToProps = (state: StoreType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessagesCallback: () => {
            dispatch(addMassage())
        },
        updateNewMessageTextCallback: (text: string) => {
            dispatch(updateNewMessageText(text))
        },
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)
