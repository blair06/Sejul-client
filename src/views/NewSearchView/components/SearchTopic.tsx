import React from 'react';
import { Card } from '../../../components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export interface INaverSearchResponse {
    display: number;
    items: INaverSearchArticle[];
    start: number;
    total: number;
}

export interface INaverSearchArticle {
    title: string;
    pubDate: string;
    originallink: string;
    link: string;
    description: string;
}

interface ISearchTopic {
    topics: INaverSearchArticle[];
}

const SearchTopic = (props: ISearchTopic) => {
    const history = useHistory();
    const { topics } = props;
    return (
        <div className="__search-view-wrapper">
            <div className="__search-view-content-container">
                <div className="__search-view-content-wrapper">
                    {
                        topics.map((item, idx) => {
                            return <Card key={idx} className="__search-card-topic"
                                onClick={() => { history.push(`/summary?title=${item.title}&link=${item.link}`) }}
                            >
                                <div className="__search-card-topic-wrapper">
                                    <p className="__search-card-topic-title" dangerouslySetInnerHTML={{ __html: item.title }}></p>
                                    <p className="__search-card-topic-desc" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                    <p className="__search-card-topic-pubdate">작성일 : {moment(item.pubDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                                </div>
                            </Card>
                        })
                    }

                    {
                        topics.length === 0 ?
                            <div className="empty">
                                <p>검색 결과가 없습니다</p>
                            </div> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchTopic;
