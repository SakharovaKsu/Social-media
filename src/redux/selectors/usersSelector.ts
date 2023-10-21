import { createSelector } from 'reselect';
import { StoreType } from '../reduxStore';
import {postPageSelector} from './postPageSelector';

const getUsersSelector = (state: StoreType) => state.usersPage;

export const usersSelector = createSelector(
    getUsersSelector,
    (usersPage) => usersPage
)

export const pageSizeSelector = createSelector(
    getUsersSelector,
    (usersPage) => usersPage.pageSize
)

export const totalUsersCountSelector = createSelector(
    getUsersSelector,
    (usersPage) => usersPage.totalUsersCount
)

export const currentPageSelector = createSelector(
    getUsersSelector,
    (usersPage) => usersPage.currentPage
)

export const isFetchingSelector = createSelector(
    getUsersSelector,
    (usersPage) => usersPage.isFetching
)

export const followingInProgressSelector = createSelector(
    getUsersSelector,
    (usersPage) => usersPage.followingInProgress
)

// createSelector для оптимизации селекторов.
// Функция createSelector принимает параметры в виде селекторов и функцию-трансформер,
// которая будет выполняться только в том случае, если входные данные изменятся.