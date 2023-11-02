import { createSelector } from 'reselect'
import { StoreType } from '../reduxStore'

const getPostPageSelector = (state: StoreType) => state.postPage

export const postPageSelector = createSelector(getPostPageSelector, (postPage) => postPage)

export const profileSelector = createSelector(getPostPageSelector, (postPage) => postPage.profile)

export const statusSelector = createSelector(getPostPageSelector, (postPage) => postPage.status)

export const photoUserSelector = createSelector(getPostPageSelector, (postPage) => postPage.profile.photos.small)
