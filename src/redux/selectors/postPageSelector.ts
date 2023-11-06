import { createSelector } from 'reselect'
import { StoreType } from '../reduxStore'

const getPostPageSelector = (state: StoreType) => state.postPage

export const postPageSelector = createSelector(getPostPageSelector, (postPage) => postPage)

export const profileSelector = createSelector(getPostPageSelector, (postPage) => postPage.profile)

export const statusSelector = createSelector(getPostPageSelector, (postPage) => postPage.status)

export const photoUserSelector = createSelector(getPostPageSelector, (postPage) => postPage.profile.photos)
export const photoUserSmallSelector = createSelector(getPostPageSelector, (postPage) => postPage.profile?.photos.small)

export const UserSelector = createSelector(getPostPageSelector, (postPage) => postPage.profile.userId)

export const ContactsSelector = createSelector(getPostPageSelector, (postPage) => postPage.profile.contacts)
