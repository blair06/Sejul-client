import React, { useState, useEffect } from 'react';
import { SubNavbar, Card, Pagination } from '../../components';
import { useHistory, useLocation } from 'react-router-dom';
import { useLocationSearch } from '../../lib/hooks';
import { IoIosSearch, IoIosClose } from 'react-icons/io';
import moment from 'moment';
import { ISummary } from '../../api/interfaces';
import './scss/index.scss';

import SearchTopic, { INaverSearchArticle, INaverSearchResponse } from './components/SearchTopic';
import SearchSummary from './components/SearchSummary';

import * as API from '../../api';

interface ISearchViewHeaderProps {
    keyword: string;
    setKeyword: (keyword: string) => void;
    onSearch: () => void;
}

const SearchViewHeader = (props: ISearchViewHeaderProps) => {
    const { keyword, setKeyword, onSearch } = props;
    const [isSearched, setIsSearched] = useState(false);
    return <div className="__search-header-container">
        <div className="__search-header-wrapper">
            {/* 검색 창 */}
            <div className="__search-header-input-form">
                <input className="__search-header-input"
                    value={keyword}
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    onChange={(e) => setKeyword(e.target.value)} />

                {
                    isSearched ?
                        <button className="__search-header-btn" type="button" onClick={() => {
                            setKeyword(""); setIsSearched(false);
                        }} >
                            <IoIosClose style={{ fontSize: '3rem' }} />
                        </button> :
                        <button className="__search-header-btn" type="button" onClick={() => {


                            setIsSearched(true); onSearch();
                        }} >
                            <IoIosSearch />

                        </button>
                }

            </div>
            {/* 탭 */}
            <SubNavbar className="__search-navbar" links={
                [
                    { to: '/search/topic/', text: '기사 검색' },
                    { to: '/search/summary/', text: '글 검색' }
                ]
            } />
        </div>
    </div>
}

interface ISearchViewProps {
    mode: string;
}

const SearchView = (props: ISearchViewProps) => {
    const { mode = "article" } = props;

    const history = useHistory();
    const loc = useLocation();
    const searches = useLocationSearch(loc.search);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    const [keyword, setKeyword] = useState("");

    const [topics, setTopics] = useState([] as INaverSearchArticle[]);
    const [summaries, setSummaries] = useState([] as ISummary[]);

    const fn = {
        fetch: {
            topic: async (page: number = 1) => {
                if (keyword === "") {
                    alert("검색어를 입력해주세요");
                    return;
                }
                const result = await API.Search.fetchArticles(keyword, page) as INaverSearchResponse;
                setTopics(result.items);
                setTotal(result.total);
                setPage(result.start);
                console.log(result);
            },
            summary: async (page: number = 1) => {
                if (keyword === "") {
                    alert("검색어를 입력해주세요");
                    return;
                }
                const result = await API.Search.fetchSummaries(keyword, page);
                setSummaries(result.data);
                setPage(result.page);
                setTotal(result.count);
            }
        }
    }

    useEffect(() => {
        setPage(1);
        setTotal(1);
        setKeyword("");
        setTopics([]);
        setSummaries([]);
    }, [mode]);

    return (
        <div className="__search-view-container">
            <SearchViewHeader keyword={keyword} setKeyword={setKeyword} onSearch={() => {
                const page = searches.find(item => item.key === "page");
                if (page) {
                    if (mode === "topic") {
                        fn.fetch.topic(Number(page.value));
                    }
                    else {
                        fn.fetch.summary(Number(page.value));
                    }
                }
                else {
                    if (mode === "topic") {
                        fn.fetch.topic();
                    }
                    else {
                        fn.fetch.summary();
                    }
                }
            }} />
            {
                mode === "topic" ?
                    <SearchTopic topics={topics} /> :
                    <SearchSummary summaries={summaries} />
            }
            <Pagination page={page} total={total} itemsPerPage={10} />
        </div>
    )
}

export default SearchView;
