import React, { FC } from 'react'
import ButtonPagination from '../ButtonPagination/ButtonPagination'
import { InitialStateUsersType } from '../../../redux/usersReducer'

type PaginatorType = {
    usersPage: InitialStateUsersType
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
}

const Paginator: FC<PaginatorType> = ({ usersPage, totalUsersCount, pageSize, onPageChanged, currentPage }) => {
    const displayedUsers = () => usersPage.users.slice(0, 8)

    // Узнаем количество пользователь, для понимая сколько нам нужно кнопок
    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    // Заполняем массив для пагинации
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map((p) => {
                const currentPageHandler = () => {
                    onPageChanged(p)
                }

                if (p === 1 || p === pagesCount || (p >= currentPage - 2 && p <= currentPage + 1)) {
                    const styleActiveButton = currentPage === p ? true : false
                    return p === 1 || p === pagesCount || (p >= currentPage - 2 && p <= currentPage + 1) ? (
                        <ButtonPagination
                            key={p}
                            buttonActive={styleActiveButton}
                            name={p.toString()}
                            callback={currentPageHandler}
                        />
                    ) : p === currentPage - 2 || p === currentPage + 2 ? (
                        <ButtonPagination key={p} name={'...'} />
                    ) : null
                }
            })}
        </div>
    )
}

export default Paginator
