import React from 'react';
import {addMassageAC, updateNewMessageTextAC} from '../../redux/dialogsReducer';
import {StoreType} from '../../redux/reduxStore';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Dialogs from './Dialogs';

// Контейнерную компоненту законектили с компонентой Dialogs
// Первая функция в connect создает контейнерную компоненту, внутри рендерит презентационную компоненту (Dialogs), и внутрь качестве пропсов передает из функций те свойства, которые ретурнятся в качестве объектов, на выхоже из 2-ой функции получим - <Dialogs dialogsPage={dialogsPage} addMessagesCallback={addMessages} updateNewMessageTextCallback={updateNewMessageText} />

const mapStateToProps = (state: StoreType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessagesCallback: () => {
            dispatch(addMassageAC())
        },
        updateNewMessageTextCallback: (text: string) => {
            dispatch(updateNewMessageTextAC(text))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;