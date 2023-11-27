import { createSelector } from 'reselect'
import { StoreType } from '../store'

const getAuthSelector = (state: StoreType) => state.auth

export const isAuthSelector = createSelector(getAuthSelector, (auth) => auth.isAuth)

export const loginSelector = createSelector(getAuthSelector, (auth) => auth.login)

export const idUserSelector = createSelector(getAuthSelector, (auth) => auth.id)

export const captchaUrlSelector = createSelector(getAuthSelector, (auth) => auth.captchaUrl)
