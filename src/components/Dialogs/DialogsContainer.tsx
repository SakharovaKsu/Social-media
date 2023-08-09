import React from 'react';
import {addMassageAC, DialogsPageType, updateNewMessageTextAC} from '../../redux/dialogsReducer';
import {StoreType} from '../../redux/redux-store';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

// type DialogsType = {
//     store: StoreType
// }
// const DialogsContainer:FC<DialogsType> = ({store}) => {
//
//     const dialogsPage = store.getState().dialogsPage
//     const dispatch = store.dispatch.bind(store)
//
//     const addMessages = () => {
//         dispatch(addMassageAC())
//     }
//
//     const updateNewMessageText = (text: string) => {
//         dispatch(updateNewMessageTextAC(text))
//     }
//
//     return (
//         <Dialogs
//             dialogsPage={dialogsPage}
//             addMessagesCallback={addMessages}
//             updateNewMessageTextCallback={updateNewMessageText}
//         />
//     )
// }

// Контейнерную компоненту законектили с компонентой Dialogs
// Первая функция в connect создает контейнерную компоненту, внутри рендерит презентационную компоненту (Dialogs), и внутрь качестве пропсов передает из функций те свойства, которые ретурнятся в качестве объектов, на выхоже из 2-ой функции получим - <Dialogs dialogsPage={dialogsPage} addMessagesCallback={addMessages} updateNewMessageTextCallback={updateNewMessageText} />

const mapStateToProps = (state: StoreType) => {
    return {
        dialogsPage: state.dialogsPage
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