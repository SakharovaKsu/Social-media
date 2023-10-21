import {StoreType} from './reduxStore';

export const statusSelector = (state: StoreType) => state.app.status
export const isInitializedSelector = (state: StoreType) => state.app.isInitialized
export const errorSelector = (state: StoreType) => state.app.error