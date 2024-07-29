import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { changeFilters, changeSort, fetchFilters, fetchSort } from '../../store/FilterSlise'

const Sort = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFilters())
        dispatch(fetchSort())
        // eslint-disable-next-line
    }, [])

    const activeCategoryes = useSelector(state => state.filters.activeCategoryes),
        filters = useSelector(state => state.filters.categoryesFilters)

    const activeSort = useSelector(state => state.filters.activeSort),
        sortFilters = useSelector(state => state.filters.sortFilters)

    const [activePopap, setActivePopap] = useState(true)

    const onClickPopap = () => {
        setActivePopap(!activePopap)
    }

    return (
        <div className="container">
            <div className="content__top">
                <div className="categories">
                    <ul>
                        {filters.map(({ id, name }) => (
                            <li
                                key={id}
                                className={classNames({ active: name === activeCategoryes })}
                                onClick={() => dispatch(changeFilters(name))}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sort">
                    <div className="sort__label" onClick={() => onClickPopap()}>
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={classNames({ 'svg-active': activePopap })}
                        >
                            <path
                                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                fill="#2C2C2C"
                            />
                        </svg>
                        <b>Сортировка по:</b>
                        <span>{activeSort}</span>
                    </div>
                    <div className={classNames({ sort__popup: true, 'sort__popup-none': activePopap })}>
                        <ul>
                            {sortFilters.map(({ id, name }) => (
                                <li
                                    key={id}
                                    className={classNames({ active: name === activeSort })}
                                    onClick={() => {
                                        dispatch(changeSort(name))
                                        onClickPopap()
                                    }}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sort
