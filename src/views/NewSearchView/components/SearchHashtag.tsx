import React, { useEffect } from 'react';
import { IHashtag, ISummary } from '../../../api/interfaces';
import { useLocationSearch } from '../../../lib/hooks';
import { Card, CircularImage, HashTag } from '../../../components';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';

interface ISearchHashtagProps {
    summaries: ISummary[],
    hashtags?: IHashtag[],
    selected?: IHashtag | undefined,
    onSelect: (_selected: IHashtag) => void;
}

const SearchHashtag = (props: ISearchHashtagProps) => {
    const history = useHistory();
    const { summaries, hashtags = [
        { "isDeleted": false, "_id": "5fa8ebdbe863f66920f614fc", "text": "코딩", "lastUpdatedDate": "2020-11-09T07:12:27.554Z", "createdAt": "2020-11-09T07:12:27.554Z", "__v": 0 }, { "isDeleted": false, "_id": "5fa8ebece863f66920f614fe", "text": "개발", "lastUpdatedDate": "2020-11-09T07:12:44.504Z", "createdAt": "2020-11-09T07:12:44.504Z", "__v": 0 }, { "isDeleted": false, "_id": "5fa8ebf0e863f66920f614ff", "text": "동물", "lastUpdatedDate": "2020-11-09T07:12:48.122Z", "createdAt": "2020-11-09T07:12:48.122Z", "__v": 0 },
    ] as unknown as IHashtag[], selected, onSelect } = props;

    console.log(hashtags);
    return (
        <div className="__search-view-wrapper">
            <div className="__search-view-content-container">
                <div className="__search-view-hashtags">
                    {
                        hashtags.map((hashtag, idx) => {
                            return <div
                                className={`__search-view-hashtag-item ${selected?._id === hashtag._id ? "active" : ""}`}
                                key={idx}
                                onClick={() => onSelect(hashtag)}
                            >
                                <p>{hashtag.text}</p>
                            </div>
                        })
                    }
                </div>
                <div className="__search-view-content-wrapper hashtag">
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

export default SearchHashtag
