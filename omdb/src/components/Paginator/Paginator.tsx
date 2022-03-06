import React, {useState} from "react";
import s from './Paginator.module.scss'
//@ts-ignore
import arrowLeft from '../../images/arrowLeft.svg';
//@ts-ignore
import arrowRight from '../../images/arrowRight.svg';

export type PaginatorTypeProps = {
    totalResults: number
    onChangedPage: (currentPage: number) => void
}

export const Paginator: React.FC<PaginatorTypeProps> = ({totalResults, onChangedPage}) => {
    let portionSize = 10;
    let pagesCounts = Math.ceil(totalResults / portionSize);
    let pages = [];
    for (let i = 1; i <= pagesCounts; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCounts / portionSize)
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize


    const onFirstPageClick = () => {
        onChangedPage(1)
        setPortionNumber(1)
    }

    const onLastPageClick = () => {
        onChangedPage(pagesCounts)
        setPortionNumber(portionCount)
    }

    const onLeftArrowPush = () => {
        onChangedPage((portionSize * (portionNumber - 2)) + 1)
        setPortionNumber(portionNumber - 1)
    }

    const onRightArrowPush = () => {
        setPortionNumber(portionNumber + 1)
        onChangedPage(portionSize * portionNumber + 1)
    }

    return (
        <div className={s.pagesWrapper}>
            {portionNumber > 1 &&
                <>
                    <button className={s.paginatorArrow}
                            onClick={onLeftArrowPush}>
                        <img src={arrowLeft} alt={'left arrow'}/>
                    </button>
                    <div className={s.item} onClick={onFirstPageClick}>1</div>
                    <div className={'styles.points'}>...</div>
                </>}

            {pages
                .filter((p) => p ? p >= leftPortionPageNumber && p <= rightPortionPageNumber : '')
                .map(p => {
                    return (
                        <div
                            key={p}
                            className={'currentPage === p ? styles.currentPage : styles.page'}
                            onClick={() => {
                                onChangedPage(p)
                            }}
                        >{p}
                        </div>
                    )
                })}
            {
                portionNumber !== portionCount &&
                <>
                    <div className={'styles.points'}>...</div>
                    <div className={s.item}
                         onClick={onLastPageClick}
                    >
                        {pagesCounts}
                    </div>
                </>
            }
            {portionCount > portionNumber &&

                <button className={s.paginatorArrow}
                        onClick={onRightArrowPush}
                >
                    <img src={arrowRight} alt={'right arrow'}/>
                </button>
            }
        </div>
    )
}