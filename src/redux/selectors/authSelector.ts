import { createSelector } from 'reselect'
import { StoreType } from '../reduxStore'

const getAuthSelector = (state: StoreType) => state.auth

export const isAuthSelector = createSelector(getAuthSelector, (auth) => auth.isAuth)

export const loginSelector = createSelector(getAuthSelector, (auth) => auth.login)

export const idSelector = createSelector(getAuthSelector, (auth) => auth.id)
