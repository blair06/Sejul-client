import React, { useEffect, useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { useLocation, useHistory } from 'react-router-dom';
import { useLocationSearch } from '../../lib/hooks';
interface IPaginationProps {
    page: number;
    total: number;
    itemsPerPage: number;
}

const Pagination = (props: IPaginationProps) => {
    const { page, total, itemsPerPage } = props;
    const [pages, setPages] = useState([] as number[]);
    const location = useLocation();
    const search = useLocationSearch(location.search);
    const history = useHistory();

    useEffect(() => {
        if (page < 3) {
            setPages([1, 2, 3, 4, 5]);
        }
        else {
            setPages([
                (page - 2),
                (page - 1),
                page,
                (page + 1),
                (page + 2),
            ]);
        }
    }, [page]);

    const fn = {
        makeQuery: (_page: number) => {
            if (location.search === "") {
                return `?page=${_page}`;
            }
            else {
                let clonedSearch = [...search];
                clonedSearch.forEach((item, idx) => {
                    if (item.key === "page") {
                        clonedSearch.splice(idx, 1);
                    }
                });

                clonedSearch.push({
                    key: "page",
                    value: _page + ""
                });

                let result = [] as string[];
                clonedSearch.forEach((item) => {
                    result.push(`${item['key']}=${item['value']}`);
                });

                return `?${result.join("&")}`;
            }
        },
        moveNext: () => {
            history.push(
                fn.makeQuery(page + 1)
            )
        },
        movePrev: () => {
            history.push(
                fn.makeQuery(page - 1)
            )
        }
    }
    return (
        <div className="__pagination-container">
            <div className="__pagination-wrapper">
                <button type="button" onClick={fn.movePrev}>
                    <RiArrowLeftSLine />
                </button>
                <div className="__pagination-items">
                    {
                        pages.map((renderPage, idx) => {
                            return <a
                                key={idx}
                                className={`pagination-item ${page === renderPage ? "active" : ""}`}
                                href={`${fn.makeQuery(renderPage)}`}
                            >{
                                    renderPage
                                }</a>;
                        })
                    }
                </div>
                <button type="button" onClick={fn.moveNext}>
                    <RiArrowRightSLine />
                </button>
            </div>
        </div >
    )
}

export default Pagination;
