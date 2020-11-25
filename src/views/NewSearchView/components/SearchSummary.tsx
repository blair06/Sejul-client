import React from 'react';
import { ISummary } from '../../../api/interfaces';
import { Card, CircularImage } from '../../../components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
interface ISearchSummaryProps {
    summaries: ISummary[]
}

const SearchSummary = (props: ISearchSummaryProps) => {
    const { summaries } = props;
    const history = useHistory();
    return (
        <div className="__search-view-wrapper">
            <div className="__search-view-content-container">
                <div className="__search-view-content-wrapper summary">
                    {
                        summaries.map((item, idx) => {
                            return <Card key={idx} className="__search-card-summary"
                                onClick={() => { history.push(`/summary/${item._id}`) }}
                            >
                                <div className="__search-card-summary-wrapper">
                                    <div className="__search-user-info">
                                        <CircularImage url={item.user.profile} alt="유저 프로필" />
                                        <p>{item.user.username}</p>
                                    </div>
                                    <div className="__search-summary-info">
                                        <p>{item.article.title}</p>
                                        <p className="__search-summary-created-at">
                                            {moment(item.createdAt).fromNow()} 작성 됨
                                        </p>
                                    </div>
                                    <div className="__search-summary-footer">

                                        <div className="__search-summary-hashtags">
                                            {
                                                item.hashtags !== undefined ?
                                                    item.hashtags.map((hashtag, hidx) => {
                                                        return <p key={hidx} className="__search-summary-hashtag">
                                                            #{hashtag.text}
                                                        </p>
                                                    }) : <></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        })
                    }
                    {
                        summaries.length === 0 ?
                            <div className="empty">
                                <p>검색 결과가 없습니다</p>
                            </div> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchSummary
