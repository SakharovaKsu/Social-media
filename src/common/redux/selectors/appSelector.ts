import { createSelector } from 'reselect'
import { StoreType } from '../store'

const getAppSelector = (state: StoreType) => state.app

export const statusSelector = createSelector(getAppSelector, (app) => app.status)

export const isInitializedSelector = createSelector(getAppSelector, (app) => app.isInitialized)

export const errorSelector = createSelector(getAppSelector, (app) => app.error)
