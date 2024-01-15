import React, { FC, useState } from 'react'
import ButtonSmall from '../ButtonSmall/ButtonSmall'
import s from './Paginator.module.css'
import Button from '../Button/Button'

type PaginatorType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    onPageChanged: (p: number) => void
}

const Paginator: FC<PaginatorType> = ({ totalItemsCount, pageSize, onPageChanged, currentPage, portionSize }) => {
    const [portionNumber, setPortionNumber] = useState(1)

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onClickButtonBack = () => {
        if (portionNumber > 1) {
            setPortionNumber(portionNumber - 1)
        }
    }

    const onClickButtonNext = () => {
        if (portionNumber < portionCount - 1) {
            setPortionNumber(portionNumber + 1)
        }
    }

    return (
        <div className={s.container}>
            <Button
                name={'Back'}
                type={'button'}
                buttonSize={'small'}
                disabledButton={portionNumber === 1}
                callback={onClickButtonBack}
            />
            <div>
                {pages
                    .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        const styleActiveButton = currentPage === p ? true : false

                        return (
                            <ButtonSmall
                                key={p}
                                buttonActive={styleActiveButton}
                                type={'button'}
                                name={p.toString()}
                                callback={() => onPageChanged(p)}
                            />
                        )
                    })}
            </div>
            <Button
                name={'Next'}
                type={'button'}
                buttonSize={'small'}
                disabledButton={portionNumber === portionCount - 1}
                callback={onClickButtonNext}
            />
        </div>
    )
}

export default Paginator
